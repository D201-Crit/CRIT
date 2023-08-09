package com.ssafy.crit.auth.jwt;

import com.ssafy.crit.common.error.code.ErrorCode;
import com.ssafy.crit.common.error.exception.BadRequestException;
import com.ssafy.crit.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException, BadRequestException {

        try {
            String authorizationHeader = request.getHeader("Authorization");
            String token = null;
            String userId = null;
            String provider = null;

            if (request.getServletPath().startsWith("/auth") || request.getServletPath().startsWith("/oauth/login/oauth2")) {
                filterChain.doFilter(request, response);
            }
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                log.info("Bearer check");
                token = authorizationHeader.substring(7);

                if (jwtProvider.isExpiration(token)) { // 만료되었는지 체크
                    throw new BadRequestException(ErrorCode.TOKEN_EXPIRED);
                }

                userId = (String) jwtProvider.get(token).get("userId");
                provider = (String) jwtProvider.get(token).get("provider");
                if(!userRepository.existsById(userId)){
                    throw new BadRequestException(ErrorCode.NOT_EXISTS_USER_ID);
                }
                // 인증 정보 등록 및 다음 체인으로 이동
                log.info("Security filter에 access Token 저장  " + token);
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userId, null, List.of(new SimpleGrantedAuthority("USER")));
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);
            }
        } catch (BadRequestException e) {
            log.info("BadRequest");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
            throw new BadRequestException(ErrorCode.NOT_VALID_TOKEN);
        } finally {
            log.debug("**** SECURITY FILTER FINISH");
        }
    }

    private JSONObject createJsonError(String errorCode, String errorMessage) {
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("error_code", errorCode);
            jsonObject.put("error_message", errorMessage);
        } catch (JSONException ex) {
            writeErrorLogs("JSONException", ex.getMessage(), ex.getStackTrace());
        }

        return jsonObject;
    }

    private void setJsonResponse(HttpServletResponse response, HttpStatus httpStatus, String jsonValue) {
        response.setStatus(httpStatus.value());
        response.setContentType(APPLICATION_JSON_VALUE);

        try {
            response.getWriter().write(jsonValue);
            response.getWriter().flush();
            response.getWriter().close();
        } catch (IOException ex) {
            writeErrorLogs("IOException", ex.getMessage(), ex.getStackTrace());
        }
    }

    private void writeErrorLogs(String exception, String message, StackTraceElement[] stackTraceElements) {
        log.error("**** " + exception + " ****");
        log.error("**** error message : " + message);
        log.error("**** stack trace : " + Arrays.toString(stackTraceElements));
    }
}
