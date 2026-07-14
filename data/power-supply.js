window.CHAINS = window.CHAINS || {};
(function(CHAINS){
CHAINS['power-supply'] = {
  "id": "power-supply",
  "name": "电源供电链（HVDC/固态变压器/MLCC）",
  "icon": "⚡",
  "meta": {},
  "segments": [],
  "midstream": {
    "name": "中游",
    "stocks": []
  },
  "plainIntro": {
    "analogy": "电源供电 = AI数据中心的\"血管系统\"——高压直流(HVDC)/固态变压器(SST)/BBU超级电容/MLCC……把电网的交流电高效、可靠地送进每一块GPU",
    "paragraphs": [
      "GB300单机柜功耗<strong>135-140kW</strong>（是GB200的2倍），Vera Rubin平台更高。传统UPS转换效率~92%→HVDC可达98%。48V供电架构+BBU超级电容（<1ms响应）正在取代12V传统架构。MLCC（片式多层陶瓷电容）单台GB300用量从2000颗→8000+颗。",
      "<strong>（待后续Phase B填充：产业链环节拆解、核心标的、供需缺口、卡口分析）</strong>"
    ],
    "flowSteps": [],
    "highlightBox": "<strong>💡 物理卡口视角</strong>：电源链的\"卡口\"集中在<strong>①高压MOSFET/SiC功率器件（英飞凌/安森美垄断）②高可靠性MLCC（村田/TDK/三星电机>60%）③HVDC整流模块（维谛/台达/中恒电气）。</strong>A股机会在HVDC和BBU配套环节。（待Phase B完整研究后填充）"
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
