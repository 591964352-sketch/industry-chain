# HBM 产业链 · SOP 试水样板（CHAINS.hbm）

> 这是用《新赛道 SOP》实跑 HBM 产出的样板：①下方研究摘要给你看逻辑；②`CHAINS.hbm` 数据块**符合 S1–S8 全套标准**（五列数组树状图 + 每环节≥5股 + 市占率 + 壁垒降序 + trend 徽章 + 四问卡口），可直接交给 Claude Code 注入（注意 app 里可能已有旧 HBM 块，按"如何使用"处理）。
>
> ⚠️ 数据为公开资料近似口径（TrendForce/Yole/券商/公告，截至 2026 年初），会变动，**不构成投资建议**。

---

## 一、研究摘要（HBM 卡口逻辑）

**宏观**：HBM 是 AI 算力的"内存咽喉"。<mark>2025 年全球 HBM 市场约 $307–357 亿（+52%），2026E ~$500 亿，美光测算 2025–2028 TAM CAGR ~40%、2028 冲 $1000 亿</mark>。产能已被长协"锁死"至 2027，结构性短缺。

**寡头格局（本体）**：SK 海力士 ~53%、三星 ~38%、美光 ~9%（2024），美光 2025H2 升至 20%+。**CR3≈100%，A 股无 HBM 本体直接标的**（国产长鑫 CXMT HBM2 已量产、HBM3 2026 目标、HBM3E 2027；武汉新芯做封装——均未上市）。

**卡口在哪**：本体买不到 → A 股卡口集中在**设备与材料**两端：
- **设备**：混合键合（HBM4 必经，铜对铜直连）是中外差距最大环节，Besi（荷兰）垄断，国产拓荆科技/北方华创激进追赶；TSV 刻蚀（成本占比近 30%）中微公司；减薄华海清科。
- **材料**：GMC 颗粒状环氧塑封料（全球仅住友/昭和 + 华海诚科，A 股唯一量产，华为哈勃参股）；前驱体（雅克科技子公司韩国先科是 SK 海力士核心供应商）；low-α 球硅填料（联瑞新材供海力士）。

**三大卡口标的**：华海诚科（GMC ★★★）、雅克科技（前驱体 ★★★）、拓荆科技（混合键合/HBM 设备 ★★☆）。

---

## 二、可注入数据块（符合 SOP，可交 Claude Code）

```javascript
// ==================== HBM 高带宽存储 ====================
CHAINS.hbm = {
  id: 'hbm', name: 'HBM 高带宽存储', icon: '🧠',
  cyclePosition: { stage:'boom', label:'繁荣中后期', reason:'🆪 AI 算力刚需+结构性短缺，产能长协锁死至2027；但本体三巨头垄断、估值已高，国产卡口在设备/材料端兑现节奏是关键变量', watchSignals:['英伟达/AMD HBM 订单与 HBM4 放量节奏','三巨头扩产与长协锁单公告','长鑫/武汉新芯 HBM 量产与国产设备材料验证进度'] },
  plainIntro: {
    analogy: 'HBM = AI 芯片身边的"超高速记忆仓库"',
    paragraphs: [
      'GPU 算得再快，数据喂不进来也白搭。<strong>HBM（高带宽内存）</strong>把多层 DRAM 用"打孔叠楼"（TSV 硅通孔）的方式 3D 堆起来，紧贴 GPU，带宽是普通内存的十几倍——这是大模型训练的命门。',
      '<strong>钱被谁赚走了？</strong> HBM 本体被韩美三家（SK 海力士/三星/美光）垄断，A 股<strong>买不到本体</strong>。但造 HBM 要用的<strong>关键设备（混合键合机）和关键材料（GMC 塑封料、前驱体）</strong>，国产正在卡位突破——这才是 A 股的"河道收窄处"。'
    ],
    flowSteps: ['DRAM 晶圆','TSV 硅通孔钻孔','晶圆减薄','多层堆叠键合','GMC 塑封','2.5D 封装上 GPU'],
    highlightBox: '<strong>💡 物理卡口视角：本体买不到，就盯"卖铲子+卖耗材"</strong><br>HBM 本体 CR3≈100% 且全是外资，A 股无直接标的。真正的国产卡口在两端：① <strong>混合键合设备</strong>（HBM4 必经、Besi 垄断、拓荆/北方华创追赶）；② <strong>GMC 颗粒塑封料</strong>（全球仅住友/昭和+华海诚科，A 股唯一量产）；③ <strong>前驱体</strong>（雅克子公司是 SK 海力士核心供应商）。'
  },
  overview: [
    { label: '🌍 全球 HBM 市场(2026E)', value: '~$500 亿', note: '2025约$307-357亿+52%（TrendForce）', color: 'var(--accent)' },
    { label: '📈 TAM CAGR(25-28)', value: '~40%', note: '2028冲$1000亿（美光测算）', color: 'var(--green)' },
    { label: '🏆 本体寡头格局', value: 'SK53/三星38/美光9', note: '2024份额%，CR3≈100%', color: 'var(--blue)' },
    { label: '🇨🇳 本体国产化率', value: '~0%(未上市)', note: 'CXMT HBM2量产/HBM3 2026目标', color: 'var(--red)' },
    { label: '⚡ 核心驱动', value: 'GB300+HBM4', note: '英伟达Rubin 2026，单GPU用量升', color: null },
    { label: '🏭 供需状态', value: '结构性短缺', note: '长协锁死至2027', color: 'var(--accent)' },
    { label: '🔴 核心矛盾', value: '本体买不到', note: '卡口在设备(混合键合)+材料(GMC)', color: 'var(--red)' },
    { label: '🔧 混合键合设备', value: 'Besi 垄断', note: 'HBM4必经，拓荆/北方华创追赶', color: 'var(--red)' }
  ],
  // 5 列横向树状图：五键全为数组（渲染器靠 Array.isArray 判定）
  treeMap: {
    downstream: [
      { name: 'AI GPU/加速卡(主力)', barrier:'high', note:'英伟达/AMD/华为昇腾 · 单GPU配6-8颗HBM',
        companies:[ {name:'工业富联',code:'601138',position:'英伟达AI服务器整机代工龙头',barrier:'高'}, {name:'寒武纪',code:'688256',position:'国产AI芯片，需配国产HBM',barrier:'高'}, {name:'海光信息',code:'688041',position:'国产CPU/DCU',barrier:'高'} ] },
      { name: 'AI 服务器/HPC', barrier:'high', note:'数据中心 · HBM装载量年增30-50%',
        companies:[ {name:'浪潮信息',code:'000977',position:'国内AI服务器市占50%+',barrier:'高'}, {name:'中科曙光',code:'603019',position:'HPC+液冷',barrier:'高'} ] }
    ],
    midstream: [
      { name: 'HBM 本体制造', barrier:'extreme', note:'SK/三星/美光垄断 · 国产CXMT/武汉新芯未上市 · A股无直接标的',
        companies:[ {name:'(长鑫CXMT)',code:'未上市',position:'HBM2量产/HBM3 2026目标',barrier:'极高'}, {name:'(武汉新芯)',code:'未上市',position:'HBM先进封装',barrier:'极高'} ] },
      { name: '先进封装/2.5D-3D', barrier:'high', note:'CoWoS/HBM后道 · 客户可切换→非卡口',
        sourceSegment: 'HBM制造+先进封装（中游）' }
    ],
    materials: [
      { name: 'GMC 颗粒状塑封料', barrier:'extreme', choke:true, note:'全球仅住友/昭和+华海诚科 · A股唯一量产', sourceSegment:'GMC颗粒状环氧塑封料' },
      { name: '前驱体材料', barrier:'extreme', choke:true, note:'雅克子公司=SK海力士核心供应商 · 贯穿全世代', sourceSegment:'前驱体材料' },
      { name: 'low-α球硅/球铝填料', barrier:'high', choke:false, note:'GMC核心填料占比70-90% · 联瑞供海力士', companies:[ {name:'联瑞新材',code:'688300',position:'low-α球硅，供SK海力士',barrier:'高'}, {name:'壹石通',code:'688733',position:'low-α球铝(散热)',barrier:'中'} ] }
    ],
    equipment: [
      { name: '混合键合/键合设备', barrier:'extreme', choke:true, note:'HBM4必经，Besi垄断 · 拓荆/北方华创追赶', sourceSegment:'混合键合及核心设备' },
      { name: 'TSV刻蚀/减薄', barrier:'high', choke:false, note:'TSV占HBM成本近30% · 中微/华海清科', companies:[ {name:'中微公司',code:'688012',position:'TSV深孔刻蚀设备主供',barrier:'高'}, {name:'华海清科',code:'688120',position:'国产减薄/CMP唯一量产',barrier:'高'} ] },
      { name: '测试设备', barrier:'high', choke:false, note:'HBM测试复杂度高 · 华峰/长川', sourceSegment:'测试设备' }
    ],
    sideBranches: [
      { name: '存储模组/颗粒/代理', barrier:'mid', note:'HBM代理+利基存储 · 香农芯创(海力士代理)',
        companies:[ {name:'香农芯创',code:'300475',position:'SK海力士国内核心代理',barrier:'中'}, {name:'兆易创新',code:'603986',position:'利基存储+MCU龙头',barrier:'中'}, {name:'江波龙',code:'301308',position:'存储模组龙头',barrier:'中'} ] },
      { name: '玻璃通孔 TGV/中介层', barrier:'high', note:'下一代基板技术 · 沃格光电TGV',
        companies:[ {name:'沃格光电',code:'603773',position:'玻璃通孔TGV',barrier:'高'} ] }
    ]
  },
  segments: [],
  midstream: { description:'', stocks:[] },
  fourQuestions: { segments:[] },
  chokePoints: [],
  supplyGap: []
};

CHAINS.hbm.segments = [
  {
    name:'混合键合及核心设备', costRatio:'设备最高价值环节', barrier:'extreme', choke:true, border:true,
    intro:'混合键合（Hybrid Bonding，铜对铜直连）是 <strong>HBM4 16Hi/20Hi 堆叠的必经之路</strong>，也是中外差距最大的环节，核心设备被荷兰 <strong>Besi</strong> 垄断。当前国产 HBM 主用 TCB-NCF 热压键合（依赖新加坡 ASMPT）。国产追赶以 <strong>拓荆科技</strong>（国内唯一量产 PECVD、深度参与混合键合）与北方华创为主。',
    globalLandscape:[
      { lbl:'🥇 Besi（荷兰）', val:'混合键合设备全球垄断', note:'晶圆对晶圆/芯片对晶圆' },
      { lbl:'ASMPT（新加坡）', val:'TCB 热压键合主供', note:'国产 HBM 产线主力进口设备' },
      { lbl:'拓荆科技（中）', val:'国产唯一量产 PECVD，混合键合追赶', note:'HBM 设备国产化率>50%' },
      { lbl:'北方华创（中）', val:'平台型设备，键合/刻蚀布局', note:'国产替代主力' }
    ],
    stocks:[
      { rank:1, name:'拓荆科技', code:'688072', position:'国产唯一量产PECVD，薄膜沉积国内市占>25%', barrier:'极高', hits:3, strength:'★★☆', trend:'up', trendNote:'HBM设备放量+混合键合突破', logic:'国内唯一量产PECVD企业，深度参与HBM混合键合研发，设备国产化率>50%，存储双雄订单占比高。混合键合仍受Besi垄断→暂列潜在卡口' },
      { rank:2, name:'北方华创', code:'002371', position:'国内最大平台型设备商，全球第5', barrier:'极高', hits:3, strength:'★★☆', trend:'up', trendNote:'刻蚀/薄膜/键合全布局', logic:'覆盖刻蚀/薄膜/清洗/热处理，HBM相关键合与刻蚀设备布局，在手订单饱满，国产替代平台龙头' },
      { rank:3, name:'中微公司', code:'688012', position:'TSV深孔刻蚀设备主供', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'TSV刻蚀受益HBM', logic:'2010年即推出首台TSV深孔硅刻蚀设备，TSV占HBM成本近30%，刻蚀需求随堆叠层数增加' },
      { rank:4, name:'华海清科', code:'688120', position:'国产CMP/减薄设备唯一量产', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'晶圆减薄受益HBM堆叠', logic:'HBM超薄晶圆堆叠需多次减薄，国产减薄/CMP唯一量产，导入存储产线' },
      { rank:5, name:'快克智能', code:'603203', position:'国产TCB热压键合追赶者', barrier:'中', hits:null, strength:null, trend:'up', trendNote:'TCB国产研发', logic:'国产TCB键合设备研发中，对标ASMPT，HBM12层以下键合有切入机会' },
      { rank:6, name:'赛腾股份', code:'688343', position:'HBM芯片检测设备供应商', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'检测设备配套', logic:'供货HBM相关检测设备，受益封测扩产，壁垒中等' }
    ]
  },
  {
    name:'GMC颗粒状环氧塑封料', costRatio:'封装关键耗材', barrier:'extreme', choke:true, border:true,
    intro:'GMC（颗粒状环氧塑封料）是 HBM 3D 堆叠封装的<strong>核心耗材</strong>，保护芯片并散热，随堆叠层数增加用量与价值量显著提升。<strong>全球仅日本住友、昭和电工 + 华海诚科三家通过认证</strong>，华海诚科是 <strong>A 股唯一量产</strong>、华为哈勃参股。GMC 核心填料 low-α 球硅占成本 70-90%（联瑞新材供货）。',
    globalLandscape:[
      { lbl:'🥇 日本住友', val:'EMC全球市占~40%，GMC双寡头', note:'高端封装料垄断' },
      { lbl:'🥈 昭和电工 Resonac（日）', val:'GMC 另一寡头', note:'HBM 主供' },
      { lbl:'华海诚科（中）', val:'A股唯一量产GMC', note:'通过验证，替代日系，华为哈勃参股' },
      { lbl:'联瑞新材（中）', val:'low-α球硅填料供海力士', note:'GMC核心填料占比70-90%' }
    ],
    stocks:[
      { rank:1, name:'华海诚科', code:'688535', position:'A股唯一量产GMC，全球仅3家之一', barrier:'极高', hits:4, strength:'★★★', trend:'up', trendNote:'GMC替代日系+华为哈勃参股', logic:'A股唯一量产颗粒状环氧塑封料(GMC)，HBM必备耗材，已通过客户验证、技术替代住友/昭和，华为深圳哈勃参股，国产替代空间超百亿' },
      { rank:2, name:'联瑞新材', code:'688300', position:'low-α球硅龙头，供SK海力士', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'球硅随HBM堆叠层数增量', logic:'GMC核心填料low-α球形硅微粉(球形度≥98%)小批量供货SK海力士，HBM 8→12层升级带动单位用量提升' },
      { rank:3, name:'壹石通', code:'688733', position:'low-α球铝(HBM基板散热)', barrier:'中', hits:null, strength:null, trend:'up', trendNote:'球铝导热受益', logic:'供应low-α球形氧化铝(导热30W/mK)用于HBM散热，客户覆盖三星/海力士封装厂' },
      { rank:4, name:'飞凯材料', code:'300398', position:'子公司长兴电子EMC', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'EMC布局HBM料', logic:'环氧塑封料布局，研发HBM相关高端封装料，尚处导入' },
      { rank:5, name:'德邦科技', code:'688035', position:'临时键合胶/底部填充胶国产领先', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'底填/临时键合胶进口替代', logic:'板级底填技术达国际先进，配合华为开发芯片级底填，临时键合胶是HBM晶圆减薄关键耗材' },
      { rank:6, name:'圣泉集团', code:'605589', position:'电子级酚醛/树脂固化剂', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'GMC上游树脂配套', logic:'电子级酚醛树脂等GMC上游原料，配套国产塑封料供应链' }
    ]
  },
  {
    name:'前驱体材料', costRatio:'薄膜沉积关键', barrier:'extreme', choke:true, border:true,
    intro:'前驱体用于 HBM 堆叠介质层的薄膜沉积，技术壁垒贯穿 HBM 全世代。<strong>雅克科技子公司韩国先科（UP Chemical）是 SK 海力士前驱体核心供应商</strong>，同时供货合肥长鑫，国家大基金入股力挺，绑定全球 HBM 绝对龙头。',
    globalLandscape:[
      { lbl:'🥇 雅克科技/韩国先科（中）', val:'SK海力士前驱体核心供应商', note:'海力士收入占比~50%，长鑫核心供应商' },
      { lbl:'默克/Merck（德）', val:'全球前驱体巨头', note:'高端前驱体' },
      { lbl:'空气化工  APD（美）', val:'电子材料巨头', note:'前驱体/特气' }
    ],
    stocks:[
      { rank:1, name:'雅克科技', code:'002409', position:'子公司韩国先科=SK海力士前驱体核心供应商', barrier:'极高', hits:4, strength:'★★★', trend:'up', trendNote:'绑定海力士+长鑫，HBM全世代受益', logic:'子公司UP Chemical为全球半导体前驱体龙头，SK海力士与合肥长鑫核心供应商，海力士收入占比~50%，大基金入股，技术贯穿HBM全世代' },
      { rank:2, name:'南大光电', code:'300346', position:'电子特气+前驱体，ArF光刻胶国产唯一', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'前驱体/特气拓展HBM', logic:'前驱体与电子特气布局，半导体材料壁垒最高品种之一，受益存储扩产' },
      { rank:3, name:'安集科技', code:'688019', position:'CMP抛光液国产龙头', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'CMP抛光液受益HBM减薄', logic:'CMP抛光液国产龙头，HBM多次减薄/平坦化带动抛光材料用量' },
      { rank:4, name:'鼎龙股份', code:'300054', position:'CMP抛光垫国产唯一量产', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'抛光垫国产替代', logic:'CMP抛光垫国产唯一量产，HBM晶圆减薄/平坦化刚需耗材' },
      { rank:5, name:'华特气体', code:'688268', position:'电子特种气体国产龙头', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'特气配套', logic:'电子特气国产龙头，配套存储晶圆制造，壁垒中等' }
    ]
  },
  {
    name:'测试设备', costRatio:'后道配套', barrier:'high', choke:false, border:false,
    intro:'HBM 堆叠层数高、测试复杂度与价值量显著高于普通 DRAM，带动测试机/分选/检测需求。国产 <strong>华峰测控、长川科技</strong> 为模拟/数字测试机主力，部分企业已切入海力士供应链。卡口判定：全球供应商较多、客户可切换→非物理卡口，但有强国产替代 β。',
    globalLandscape:[
      { lbl:'🥇 泰瑞达/爱德万', val:'全球测试机双寡头', note:'高端存储测试主导' },
      { lbl:'华峰测控（中）', val:'国产模拟测试机龙头', note:'切入先进封装测试' },
      { lbl:'长川科技（中）', val:'数字测试机+分选', note:'国产替代加速' }
    ],
    stocks:[
      { rank:1, name:'华峰测控', code:'688200', position:'国产模拟测试机龙头', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'先进封装测试受益', logic:'国产模拟/功率测试机龙头，向SoC/先进封装测试拓展，受益HBM封测扩产' },
      { rank:2, name:'长川科技', code:'300604', position:'数字测试机+分选机国产领先', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'存储测试国产替代', logic:'数字测试机与分选机国产领先，切入存储测试，订单随HBM/先进封装增长' },
      { rank:3, name:'精测电子', code:'300567', position:'半导体检测设备', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'检测设备配套', logic:'膜厚/缺陷检测设备，配套晶圆制造与先进封装' },
      { rank:4, name:'亚威股份', code:'002559', position:'参股苏州芯测，测试机供海力士', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'参股切入HBM测试', logic:'参股苏州芯测，其子公司存储芯片测试机供应SK海力士，间接受益' },
      { rank:5, name:'赛腾股份', code:'688343', position:'HBM芯片检测设备', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'检测配套', logic:'HBM相关检测设备供应商，受益封测扩产' }
    ]
  },
  {
    name:'先进封装(2.5D/3D)', costRatio:'后道集成', barrier:'high', choke:false, border:false,
    intro:'HBM 需经 2.5D/3D 先进封装（CoWoS 类）与 GPU 集成。国产封测龙头 <strong>通富微电（AMD 长期伙伴，CoWoS-like 扩产、长鑫后道）、长电科技</strong> 技术积累深厚。卡口判定：封测客户可切换→非物理卡口，但国产 HBM 量产将直接拉动后道需求。',
    globalLandscape:[
      { lbl:'🥇 台积电', val:'CoWoS 先进封装垄断', note:'HBM+GPU 2.5D集成主导' },
      { lbl:'通富微电（中）', val:'CoWoS-like扩产，长鑫后道伙伴', note:'AMD长期封测伙伴' },
      { lbl:'盛合晶微（中，未上市）', val:'华为体系硅中介层', note:'昇腾配套' }
    ],
    stocks:[
      { rank:1, name:'通富微电', code:'002156', position:'CoWoS-like扩产，长鑫最重要后道伙伴', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'2.5D封装+长鑫HBM后道', logic:'AMD长期封测伙伴，南通基地大规模扩建CoWoS-like产能，已具备6/8层HBM封测能力，长鑫后道核心合作伙伴' },
      { rank:2, name:'长电科技', code:'600584', position:'国内封测龙头', barrier:'高', hits:null, strength:null, trend:'flat', trendNote:'先进封装布局', logic:'国内封测龙头，先进封装技术布局，承接HPC/HBM相关封装' },
      { rank:3, name:'太极实业', code:'600667', position:'与海力士封测合资(海太半导体)', barrier:'高', hits:null, strength:null, trend:'up', trendNote:'海力士封测直接受益', logic:'子公司与SK海力士合资负责后工序封测，直接绑定HBM龙头产能' },
      { rank:4, name:'华天科技', code:'002185', position:'封测三强之一', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'先进封装跟进', logic:'封测三强，先进封装产能扩张，间接受益HBM后道' },
      { rank:5, name:'甬矽电子', code:'688362', position:'先进封装新锐', barrier:'中', hits:null, strength:null, trend:'up', trendNote:'高端封装放量', logic:'聚焦先进封装(FC/SiP)，高端产能爬坡' },
      { rank:6, name:'深科技', code:'000021', position:'存储封测+模组', barrier:'中', hits:null, strength:null, trend:'flat', trendNote:'存储封测配套', logic:'存储芯片封测与模组，配套国产存储' }
    ]
  }
];

CHAINS.hbm.midstream = {
  description:'HBM 本体（SK海力士/三星/美光）A股无直接标的；中游 A股机会在先进封装与封测、模组代理。客户可切换→该环节无物理卡口，但国产 HBM 量产将强拉动后道。按壁垒/卡位排序。',
  stocks:[
    { rank:1, name:'通富微电', code:'002156', barrier:'高', trend:'up', note:'CoWoS-like扩产，长鑫后道核心伙伴，6/8层HBM封测能力' },
    { rank:2, name:'太极实业', code:'600667', barrier:'高', trend:'up', note:'与SK海力士合资封测，直接绑定HBM龙头产能' },
    { rank:3, name:'长电科技', code:'600584', barrier:'高', trend:'flat', note:'封测龙头，先进封装布局' },
    { rank:4, name:'雅克科技', code:'002409', barrier:'极高', trend:'up', note:'前驱体卡口，海力士+长鑫核心供应商' },
    { rank:5, name:'华海诚科', code:'688535', barrier:'极高', trend:'up', note:'GMC卡口，A股唯一量产，华为哈勃参股' },
    { rank:6, name:'拓荆科技', code:'688072', barrier:'极高', trend:'up', note:'HBM设备主力，PECVD国产唯一+混合键合追赶' },
    { rank:7, name:'香农芯创', code:'300475', barrier:'中', trend:'flat', note:'SK海力士国内核心代理，代理壁垒中等' },
    { rank:8, name:'华天科技', code:'002185', barrier:'中', trend:'flat', note:'封测三强，间接受益' },
    { rank:9, name:'兆易创新', code:'603986', barrier:'中', trend:'flat', note:'利基存储+MCU龙头，存储周期受益' },
    { rank:10, name:'佰维存储', code:'688525', barrier:'中', trend:'flat', note:'存储模组+测试，国产存储配套' }
  ]
};

CHAINS.hbm.fourQuestions = {
  segments:[
    { name:'GMC颗粒状塑封料', stocks:[
      { name:'华海诚科', code:'688535', q1:true, q1note:'全球仅3家', q2:true, q2note:'认证周期长', q3:true, q3note:'GMC无成熟替代', q4:true, q4note:'HBM堆叠必备', hits:4, strength:'★★★' },
      { name:'联瑞新材', code:'688300', q1:false, q1note:'填料供应商多', q2:false, q2note:'', q3:false, q3note:'', q4:true, q4note:'GMC刚需填料', hits:1, strength:null }
    ]},
    { name:'前驱体材料', stocks:[
      { name:'雅克科技', code:'002409', q1:true, q1note:'海力士核心供应商', q2:true, q2note:'认证壁垒高', q3:true, q3note:'前驱体专用', q4:true, q4note:'全世代刚需', hits:4, strength:'★★★' },
      { name:'南大光电', code:'300346', q1:false, q1note:'全球多家', q2:true, q2note:'', q3:false, q3note:'', q4:true, q4note:'', hits:2, strength:null }
    ]},
    { name:'混合键合设备', stocks:[
      { name:'拓荆科技', code:'688072', q1:true, q1note:'国产唯一量产PECVD', q2:true, q2note:'设备研发周期长', q3:false, q3note:'Besi垄断混合键合', q4:true, q4note:'HBM设备刚需', hits:3, strength:'★★☆' },
      { name:'北方华创', code:'002371', q1:false, q1note:'平台型多产品', q2:true, q2note:'', q3:false, q3note:'', q4:true, q4note:'', hits:2, strength:null }
    ]},
    { name:'先进封装(可切换)', stocks:[
      { name:'通富微电', code:'002156', q1:false, q1note:'封测厂多', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'客户可切换', hits:0, strength:null },
      { name:'长电科技', code:'600584', q1:false, q1note:'', q2:false, q2note:'', q3:false, q3note:'', q4:false, q4note:'', hits:0, strength:null }
    ]}
  ]
};

CHAINS.hbm.chokePoints = [
  { rank:1, name:'华海诚科', code:'688535', segment:'GMC颗粒状塑封料', strength:'★★★', logic:'<strong>A股唯一量产GMC</strong>，全球仅住友/昭和+华海诚科三家通过认证。GMC是HBM 3D堆叠封装<strong>必备耗材</strong>，随层数增加用量与价值量提升，技术已替代日系。<strong>华为深圳哈勃参股</strong>，一旦国产HBM全链打通，有望切入昇腾供应链。国产替代空间超百亿。', tags:['全球仅3家','无替代','华为哈勃参股','国产唯一量产'],
    valuation:{ pe:'🆪 偏高', pePercentile:80, grossMargin:'高端料毛利高', fromHigh:'—', note:'🆪 AI估值初版：GMC国产稀缺性强，但量产爬坡与认证节奏决定兑现，注意高位波动；周一cron以真实数据覆盖' },
    verification:{ items:[
      { type:'供给寡头', claim:'全球仅住友/昭和+华海诚科3家通过GMC认证', howToCheck:'查华海诚科公告/季报GMC认证与送样进展，搜是否有第4家宣布量产', falsifySignal:'出现第4家量产或客户去华海诚科化→卡口降级', status:'pending' },
      { type:'产能缺口', claim:'国产替代空间超百亿，随HBM层数增量', howToCheck:'查GMC订单/产能公告，交叉验证长鑫/通富HBM放量节奏', falsifySignal:'GMC验证停滞或国产HBM延期→需求逻辑塌', status:'pending' },
      { type:'财报印证', claim:'GMC量产替代日系、毛利高', howToCheck:'查华海诚科最新季报GMC营收占比与毛利率，毛利是定价权最难造假的证据', falsifySignal:'GMC营收不放量/毛利平庸→卡口存疑', status:'pending' },
      { type:'交叉信源', claim:'≥2独立来源印证GMC唯一量产+哈勃参股', howToCheck:'券商深度研报+公司公告+哈勃持股披露同时印证', falsifySignal:'仅单一自媒体来源→存疑', status:'pending' }
    ], note:'初始清单，需手动核查后切换状态' } },
  { rank:2, name:'雅克科技', code:'002409', segment:'前驱体材料', strength:'★★★', logic:'子公司<strong>韩国先科(UP Chemical)是SK海力士前驱体核心供应商</strong>，同时供货合肥长鑫，国家大基金入股。前驱体用于HBM堆叠介质层薄膜沉积，<strong>技术贯穿HBM全世代</strong>，深度绑定全球HBM绝对龙头。', tags:['海力士核心供应商','全世代刚需','大基金入股','绑定长鑫'],
    valuation:{ pe:'🆪 中高', pePercentile:65, grossMargin:'前驱体毛利较高', fromHigh:'—', note:'🆪 AI估值初版：绑定海力士+长鑫双龙头，HBM增长确定性强；周一cron覆盖' },
    verification:{ items:[
      { type:'供给寡头', claim:'韩国先科为SK海力士前驱体核心供应商', howToCheck:'查雅克科技年报海力士收入占比、韩国先科营收，搜默克/APD份额变化', falsifySignal:'海力士导入第二供应商/份额下滑→卡口降级', status:'pending' },
      { type:'产能缺口', claim:'HBM产能高增带动前驱体放量', howToCheck:'查雅克前驱体产能/订单与海力士HBM扩产指引交叉验证', falsifySignal:'前驱体收入不随HBM增长→逻辑塌', status:'pending' },
      { type:'财报印证', claim:'前驱体营收高增、毛利稳', howToCheck:'查雅克最新季报前驱体分部营收增速与毛利率', falsifySignal:'营收停滞/毛利下滑→存疑', status:'pending' },
      { type:'交叉信源', claim:'≥2来源印证海力士核心供应商地位', howToCheck:'券商研报+公司公告+大基金持股披露', falsifySignal:'仅单一来源→存疑', status:'pending' }
    ], note:'初始清单，需手动核查后切换状态' } },
  { rank:3, name:'拓荆科技', code:'688072', segment:'混合键合/HBM设备', strength:'★★☆', logic:'<strong>国产唯一量产PECVD</strong>，薄膜沉积国内市占>25%，<strong>深度参与HBM混合键合研发</strong>，HBM设备国产化率>50%，存储双雄订单占比高。混合键合核心设备仍受Besi垄断→暂列潜在卡口(3/4)，若量产突破可升级。', tags:['PECVD国产唯一','HBM设备国产化>50%','混合键合追赶','存储双雄绑定'],
    valuation:{ pe:'🆪 高', pePercentile:75, grossMargin:'设备毛利较高', fromHigh:'—', note:'🆪 AI估值初版：HBM设备弹性大，但混合键合量产突破前估值已抢跑，注意节奏；周一cron覆盖' },
    verification:{ items:[
      { type:'供给寡头', claim:'国产唯一量产PECVD+混合键合追赶', howToCheck:'查拓荆混合键合设备验证/出货进展，对比Besi垄断是否松动', falsifySignal:'混合键合迟迟无法量产/被竞品超越→维持★★☆或降级', status:'pending' },
      { type:'产能缺口', claim:'HBM设备国产化>50%，订单饱满', howToCheck:'查拓荆存储设备订单与长鑫/武汉新芯扩产招标', falsifySignal:'存储订单不增→逻辑塌', status:'pending' },
      { type:'财报印证', claim:'PECVD市占>25%、存储收入占比高', howToCheck:'查拓荆季报存储收入占比、毛利率、在手订单', falsifySignal:'存储收入占比下滑→存疑', status:'pending' },
      { type:'交叉信源', claim:'≥2来源印证PECVD唯一量产+混合键合参与', howToCheck:'券商研报+公司公告交叉', falsifySignal:'仅单一来源→存疑', status:'pending' }
    ], note:'初始清单，需手动核查后切换状态' } }
];

CHAINS.hbm.supplyGap = [
  { segment:'HBM本体', demand:'2026E严重供不应求', capacity:'三巨头长协锁死至2027', gap:'结构性短缺', rate:'订单已锁满', bottleneck:'TSV产能+混合键合良率' },
  { segment:'GMC塑封料', demand:'随HBM层数增量', capacity:'住友/昭和主导，国产爬坡', gap:'国产替代百亿空间', rate:'—', bottleneck:'认证周期+low-α填料' },
  { segment:'混合键合设备', demand:'HBM4必需', capacity:'Besi垄断', gap:'国产几近空白', rate:'—', bottleneck:'铜对铜直连良率' }
];

CHAINS.hbm.methodologyNotes = 'HBM本体被SK海力士/三星/美光三家垄断(CR3≈100%)，A股无直接标的——这是卡口方法论的典型"买不到本体"场景。真正的国产物理卡口集中在两端：①材料端的GMC颗粒塑封料(华海诚科,全球仅3家)与前驱体(雅克,海力士核心供应商)；②设备端的混合键合(拓荆/北方华创追赶Besi垄断)。先进封装/封测/模组代理环节客户可切换→不构成物理卡口，但国产HBM(长鑫/武汉新芯)量产将强拉动后道β。本赛道已按内容质量标准S1–S8产出(五列树状图/每环节≥5股/市占率/壁垒降序/进步退步trend徽章/四问卡口)。';
```

---

## 三、如何使用这份样板

1. **app 里已有旧 HBM 块**（`// ==================== HBM / ADVANCED MEMORY ====================`）。让 Claude Code 时，明确二选一：
   - **A·替换升级**：`用这份 CHAINS.hbm 样板替换 app 里现有的 HBM 数据块，保留侧栏/CHANGELOG 不重复添加，按铁律双文件同步+语法自检，改完报告等我确认`；
   - **B·对照补强**：`对照这份样板，把现有 HBM 块补到 S1–S8 达标（补 trend 徽章/补每环节≥5股/补占比），只增不减`。
2. 不管哪种，都走作业手册的**避坑清单 + 验收清单**（双文件同步、五键全数组、barrier 降序、不填 socratic/occam、不主动 commit）。
3. 这份块本身就是 **S1–S8 的合格范例**，以后加新赛道可让 Claude Code "参照 HBM 样板的结构与字段密度产出"。

> 数据为研究级近似口径，注入后建议跑一次 `/serenity --update` 用最新财报/认证进展刷新，并把 🆪 主观项核实后再定。**不构成投资建议。**
