import React, { useState, useEffect } from "react";
import { Image } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
import { AdsenseMain } from "./adsense/main";

export const Home = () => {
  const [isAdsense, setIsAdsense] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAdsense(true);
    }, 100);
    return setIsAdsense(false);
  }, []);

  return (
    <div>
      <div className="play-container">
        <div className="text-center mt-3">
          <h1>순간기억력 - 두뇌운동</h1>
        </div>
        <div className="text-center">
          <Image
            src="https://f5game.s3.ap-northeast-2.amazonaws.com/memory.png"
            style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}
            alt="memory"
            preview={false}
          />
        </div>
        <div className="my-4">{isAdsense ? <AdsenseMain /> : ""}</div>
        <div>
          <Link className="btn-list" to="/game/start">
            <button className="btn-start">START</button>
          </Link>
        </div>
        <article>
          <div className="post">
            <h1>순간기억력을 즐겨보세요</h1>
            <p>
              사람들은 누구나 한 번쯤 자신의 두뇌 능력에 대해 궁금해 한다. 나
              또한 마찬가지였다. 하지만 막상 내 머리 속 뇌 구조를 들여다볼 수도
              없고 도대체 어떻게 해야 내 머릿속 모든 정보를 확인할 수 있는지
              방법조차 몰랐다. 그러다 우연히 ‘순간기억력’이라는 테스트를 알게
              되었고 호기심에 도전해보기로 했다. 그리고 결과는 놀라웠다. 무려
              10개의 항목 모두 만점을 받은 것이다. 나는 스스로 천재라고 자부하며
              가족 및 친구들에게 자랑하기 시작했다. 그러자 신기하게도 아무도
              믿어주지 않았다. 분명 인터넷에서는 효과가 좋다고 했는데 왜 안 믿는
              거지? 그때 문득 스쳐가는 생각이 있었다. 바로 너무 과장된 광고였던
              것이다. 실제로 해당 테스트 사이트에서도 주의사항이라며
              과대광고라는 문구를 넣어 놓았다. 그래도 재미 삼아 본 테스트 덕분에
              한동안 실없는 웃음을 지으며 지낼 수 있었다.
            </p>
          </div>
          <div className="post">
            <h1>순간기억력에 대하여</h1>
            <p>
              순간기억력은 뇌 활동 증진 및 치매 예방 효과가 있는 퍼즐
              게임입니다. 매일 한 조각씩 도전하여 목표 달성 시 더 어려운 단계에
              도전할 수 있습니다. 아이들은 물론 어르신들도 쉽게 즐길 수 있어
              가족 모두 즐기기 좋습니다.
            </p>
          </div>
          <div className="post">
            <h1>순간기억력 두뇌활동</h1>
            <p>
              뇌 건강을 유지하기 위해서는 새로운 자극이 필요하다. 즉 매일 같은
              일상만 반복하면 뇌 활동도 둔해진다. 평소 하지 않던 일을 하거나
              운동을 하는 식으로 변화를 줘야 한다. 만약 집 안에만 있다면 TV나
              스마트폰 대신 독서를 하자. 지적 능력 향상뿐 아니라 치매 예방
              효과도 있다. 또한 퍼즐 맞추기 게임처럼 손을 계속 움직이는 놀이도
              좋다.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};
