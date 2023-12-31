## 프론트 영역
### 진재환 - 회고
저는 Frontend개발자로서 초기 폴더 구조와 컴포넌트 세분화, UI와 디자인, 회원가입, JWT토큰을 활용한 로그인 그리고 챌린지 생성, 알람, 참여 등 챌린지의 모든 부분을 맡았습니다.

1. 폴더 구조와 컴포넌트
부족한 점 :
확실한 규칙 없이 만든 폴더 구조
네이밍 규칙을 정하지 않아 네이밍이 어려웠고 컴포넌트 세분화가 부족했다
개선 방안 :
폴더 구조를 만들 때 일관된 규칙을 정하고 반드시 준수한다.
명확하고 일관된 네이밍 규칙을 정하고, 컴포넌트 및 파일의 이름을 의미있게 작성한다.
컴포넌트를 더 세분화하고 재사용 가능한 부분은 별도의 컴포넌트로 분리하여 구현한다.
2. UI와 디자인
부족한 점 :
반응형 웹 디자인 구현을 하지 못했다.
사용자의 이동경로를 고려한 페이지 레이아웃을 구성하지 못했다.
개선 방안 :
반응형 웹 디자인 구현을 우선적으로 고려한다. CSS의 미디어 쿼리를 사용하여 다양한 디바이스와 화면 크기에 맞는 레이아웃을 구성하고, Flexbox나 CSS Grid 같은 기술을 활용하여 유연한 디자인을 구현한다.
사용자 경험을 개선하기 위해 사용자들이 어떻게 웹사이트를 이용하는지를 고려하여 페이지 레이아웃을 구성한다. 주요 기능과 정보가 쉽게 접근 가능한 위치에 배치되도록 디자인하고, 사용자의 이동경로와 흐름을 고려하여 UI 요소들을 배치한다.
3. JWT 재발급
먼저 JWT토큰이란 무엇인지, 어떤 원리로 동작하는지에 대해 공부한 뒤 어떻게 로직을 작성할 까 고민했습니다. 우선 'accessToken이 만료되는 즉시 UX적 문제 없이 재발급을 받고 정상적인 요청을 처리할 수 있을까'에 대해 중점을 두고 로직을 작성했습니다. 차후 지속적인 유지보수와 리팩토링을 통해 JWT토큰 재발급 로직을 좀 더 안전하고 클린한 코드로 수정할 예정입니다.

4. 기능 구현
컴포넌트 세분화와 성공적인 기능 구현에 집중했습니다. 최초 생각했던 기능들을 모두 구현했고 컴포넌트도 세분화하여 잘 작성했다고 생각했으나, 프로젝트 종료 후 천천히 코드를 살펴보니 기능 구현에 너무 집중한 나머지 코드를 클린하게 작성하지 못했고 없어도 되는 코드들도 간간히 보였습니다. 차후 지속적인 유지보수와 리팩토링을 통해 좀 더 간결한 클린 코드로 수정 할 예정입니다.
