// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PayResultPage = (props) => {
//   const {
//     location: { search },
//   } = props;

//   const pg_token = search.split("=")[1];
//   const tid = window.localStorage.getItem("tid");

//   const [params, setParams] = useState({
//     cid: "TC0ONETIME",
//     tid,
//     partner_order_id: "partner_order_id",
//     partner_user_id: "partner_user_id",
//     pg_token,
//   });

//   useEffect(() => {
//     axios({
//       url: "/v1/payment/approve",
//       method: "POST",
//       headers: {
//         Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
//         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//       },
//       params,
//     }).then((response) => {
//       // 결제 승인에 대한 응답 출력
//       console.log(response);
//     });
//   }, []);

//   return (
    // <div>
    //   <h2>Result page</h2>
    //   <p>
    //   카카오페이 결제가 정상적으로 완료되었습니다.
    //     결제일시:     [[${info.approved_at}]]<br/>
    //     주문번호:    [[${info.partner_order_id}]]<br/>
    //     상품명:    [[${info.item_name}]]<br/>
    //     상품수량:    [[${info.quantity}]]<br/>
    //     결제금액:    [[${info.amount.total}]]<br/>
    //     결제방법:    [[${info.payment_method_type}]]<br/>
    //   </p>
    // </div>
//   );
// };

// export default PayResultPage;
