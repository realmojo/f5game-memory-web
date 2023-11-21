import React, { useState, useLayoutEffect } from "react";

import styled from "styled-components";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { memory } from "../stores/memory";
import { Button, Modal } from "antd";

const MAX_WIDTH = window.innerWidth > 500 ? 500 : window.innerWidth;
const containerPadding = 10;
const tilePadding = 2;

const Container = styled.div`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${containerPadding}px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Tile = styled.div`
  width: 25%;
  display: inline-block;
  padding: ${tilePadding}px;
  background: inherit;
`;

const InnerTile = styled.div`
  height: 100%;
  border-radius: 8px;
  width: 100%;
  background: #293244;
`;

let countValue = 0;
let selectCountValue = 0;
export const Game = observer(() => {
  const navigate = useNavigate();
  const column = 4;
  const tileWidth = (MAX_WIDTH - containerPadding * 2) / column;
  const [startText, setStartText] = useState("집중");
  const [isStart, setIsStart] = useState(false);
  const [gameClearModalVisible, setGameClearModalVisible] = useState(false);
  const [gameOverModalVisible, setGameOverModalVisible] = useState(false);

  const tileHeight = tileWidth;

  const setGameInit = () => {
    selectCountValue = 0;
    memory.setItems();
    memory.initLevel();
    memory.setMemoryItem();

    setTimeout(() => {
      setStartText("집중");
      let readyInterval = setInterval(() => {
        for (let i = 0; i < memory.memoryItem.length; i++) {
          if (i === countValue) {
            memory.changeItem(memory.memoryItem[i], true);
            setTimeout(() => {
              memory.changeItem(memory.memoryItem[i], false);
            }, 700);
          }
        }
        countValue++;
        if (countValue === memory.memoryItem.length) {
          countValue = 0;
          clearInterval(readyInterval);
          setIsStart(true);
          setTimeout(() => {
            setStartText("시작");
          }, 700);
        }
      }, 1000);
    }, 1000);
  };

  const doNext = () => {
    setGameInit();
    setGameClearModalVisible(false);
  };

  const doRestart = () => {
    setGameInit();
    setGameOverModalVisible(false);
  };

  const doSelect = async (key) => {
    if (isStart) {
      if (memory.memoryItem[selectCountValue] === key) {
        memory.changeItem(key, true);
        setTimeout(() => {
          memory.changeItem(key, false);
        }, 500);
        selectCountValue++;
        if (selectCountValue === memory.memoryItem.length) {
          setIsStart(false);
          setGameClearModalVisible(true);
          memory.setLevel(memory.level + 1);
        }
      } else {
        setIsStart(false);
        setGameOverModalVisible(true);
      }
    }
  };

  useLayoutEffect(() => {
    setGameInit();
  }, []);

  return (
    <div className="site-page-header-ghost-wrapper">
      <div className="board-container">
        <div className="text-center mt-8 text-2xl">
          순간 기억력을 테스트 합니다. <div>순서대로 눌러주세요.</div>
        </div>
        <div className="flex justify-between mt-3 px-3">
          <div className="text-left pl-3 text-xl">LEVEL: {memory.level}</div>
          <div
            className="text-right pr-3 text-xl"
            style={{ color: startText === "시작" ? "red" : "" }}
          >
            {startText}
          </div>
        </div>
        <Container>
          {memory.items.map((item, key) => {
            return (
              <Tile style={{ height: tileHeight, width: tileWidth }} key={key}>
                <InnerTile
                  style={{
                    backgroundColor: item.active ? "#c8c267" : "#293244",
                  }}
                  onClick={() => doSelect(key, item)}
                />
              </Tile>
            );
          })}
        </Container>
        <Modal
          title={`LEVEL ${memory.level} CLEAR`}
          footer={null}
          open={gameClearModalVisible}
        >
          <Button
            key="submit"
            type="primary"
            onClick={doNext}
            style={{
              width: "100%",
              height: 54,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            NEXT
          </Button>
        </Modal>
        <Modal title="Game Over" footer={null} open={gameOverModalVisible}>
          <Button
            key="submit"
            type="primary"
            onClick={doRestart}
            style={{
              width: "100%",
              height: 54,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Re Try
          </Button>
        </Modal>
      </div>
    </div>
  );
});
