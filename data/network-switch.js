window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['network-switch'] = {
  "id": "network-switch",
  "name": "网络交换芯片/交换机",
  "icon": "🔀",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "网络交换芯片 = AI数据中心的\"立交桥系统\"——决定GPU之间、服务器之间、数据中心之间的数据流动效率",
    "paragraphs": [
      "AI大模型训练不是单卡作战，而是<strong>万卡集群协同</strong>。GPU之间的通信效率（All-Reduce/All-to-All）直接决定训练速度。交换芯片的带宽、端口数、延迟决定了集群的\"堵车\"程度。英伟达NVLink/NVSwitch + 博通Tomahawk/Jericho + 思科Silicon One 构成三大生态。",
      "<strong>（待后续Phase B填充：产业链环节拆解、核心标的、供需缺口、卡口分析）</strong>"
    ],
    "flowSteps": [],
    "highlightBox": "<strong>💡 物理卡口视角</strong>：交换芯片的卡口在<strong>芯片设计+先进制程</strong>——博通/英伟达/思科三家占据数据中心交换芯片>90%份额，均采用台积电7nm以下制程。A股机会在交换机组装代工（工业富联/菲菱科思）和光模块配套，纯芯片设计端尚无直接标的。（待Phase B完整研究后填充）"
  },
  "overview": [],
  "treeMap": {},
  "fourQuestions": {
    "segments": []
  },
  "chokePoints": [],
  "supplyGap": [],
  "methodologyNotes": "",
  "status": "skeleton"
};
})(window.CHAINS);
