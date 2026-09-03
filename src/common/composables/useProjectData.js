/**
 * 公共数据源：作品数据（mock）
 * 本轮为本地静态数据；后续接真实接口时，此文件可替换为 API 读取或保留为兜底数据。
 */

export const WORKS = [
  {
    id: 'archispace',
    badge: '空间 3D • WebGL',
    category: '建筑科技',
    title: 'ArchiSpace：空间建筑与 3D Web 查看器',
    summary: '专为学生设计工作室打造的交互式浏览器端 3D 建筑浏览器，用于实时审查空间布局。',
    tags: ['Next.js', 'Three.js', 'Tailwind CSS'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBixx0abHwk4_PcX_qIkXtHgSmUGeApSAAbyln26z2V9dywL3nyLwoZ3Ja0fuE42AM8Acs3L6qEICSMonT6mERgwe7olQ1y3PbXKsnp2qbYy_eNoSeV3lOOpBygrq2ZGNeyN_BRBVx2IoUEEcgb2CJ3Miw6H_1bDQVqLZno3rVIZ7F88zhAS_Hp5B-eyNgguoQlswuXn2FF75UcT-a8gTfD2sAedQsBUyHRQhOu8X7cPtIDmFuuiySN4g',
    desc: '为建筑事务所搭建物理空间设计与浏览器渲染之间的桥梁，针对高性能浏览器计算与流畅交互进行了深度优化。',
    overlayLabel: 'WEBGL 引擎运行中 — 60 FPS',
    stats: [
      { label: '多边形数', value: '142,890' },
      { label: '绘制调用', value: '24' },
    ],
  },
  {
    id: 'echonote',
    badge: '本地优先',
    category: '知识工具',
    title: 'EchoNote：极简 Markdown 双向链接知识库',
    summary: '极简 Markdown 知识库，支持本地优先离线存储与双向链接。',
    tags: ['React', 'TypeScript', 'IndexedDB'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLxSySNbbkdW-u55fWfWFypX31jpWJbD1fj888bgnuDZjyZTw9zBqbE-b9Og6gzTkVeCae25bxfsyaBsknFYR2oDTTu0ngScgPwxNfXfkuBWWtI4xEUTs_tpGSuFTzMuHFeaV3WNN69A_n2MyFf4vCJAFw0OAeI3k6w0gx6_L3o9SnxGxnVHqW3wXelk8pdWS292X7AJzQeFjVRXyqDg7tPVjTf0AwNhQc2wSgmG1F7iM0YvMq1nq73w',
    desc: '以「本地优先」为核心的 Markdown 知识库：数据保存在浏览器 IndexedDB 中，离线可用、即时检索，笔记之间的双向链接让想法自然沉淀为一张知识网络。',
    overlayLabel: 'INDEXEDDB 引擎运行中 — 本地同步',
    stats: [
      { label: '笔记数', value: '2,400+' },
      { label: '同步状态', value: '已就绪' },
    ],
  },
  {
    id: 'algorhythm',
    badge: '生成式艺术',
    category: '创意编程',
    title: 'Algorhythm：生成式音乐可视化',
    summary: '浏览器合成器与音乐可视化工具，能通过生成式粒子场对麦克风输入做出反应。',
    tags: ['Web Audio API', 'Canvas', 'Vanilla JS'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbIusUZsLzHBdGAfxYVRHo3jYVRafGzwydU9W4C_FRrspfJE1oxJWRPVxonrXGIO_srS0v-vaGjY2Xsj-_ttst91Qpmbaco3isKMvZa80UcHQqeaE8gkPwIYGBJi2jkg82HIw43Nsd5h30c6j-axfTe74TQtCRrgFX8h_IB9bouA2bxCxdG-ReRw8rnH2_t6ol81kTGR-8w2ywarNij-r9FAJAe1fZyJfRkM1H0gqtuTcN20u1Um-PZQ',
    desc: '在浏览器中直接合成音频，并以生成式粒子场实时可视化：上万粒子的运动轨迹跟随声波起伏，探索声音与视觉之间一对一的实时映射。',
    overlayLabel: 'WEB AUDIO 引擎运行中 — 48kHz',
    stats: [
      { label: '粒子数', value: '12,000' },
      { label: '渲染帧率', value: '60 FPS' },
    ],
  },
  {
    id: 'campusflow',
    badge: '全栈平台',
    category: '教育科技',
    title: 'CampusFlow：校园活动排期与资源预订',
    summary: '全栈校园活动排期与资源预订系统，已被 12 个学生社团积极投入使用。',
    tags: ['Vue 3', 'Node.js', 'PostgreSQL'],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALyayw7-qTPod4J_JQTyBCUVwjbgDwqPrgipV5y-TL6uyFmzwXUVy5_fh49tyI4QrreiRC1Bh3YJkFTgZbn1CfHrcE8f2FLK5pQEbq1yx9pHUqWNmufL2V1m7aSYK4JEWw-F5RIgDjayU3jdSbymB42DDTpLLP3ndiqFrcNP-o792e8SIT7Ivp96sUsia5TN9Pgyd_d6fJr-B9yTfaD08gQReP_0hMiEtzJQuZSCMLYG5hNrBQfh22mQ',
    desc: '面向大学社团的一体化日程平台：日历排期、场地与设备预订、成员与资源数据看板集中在同一工作流内，已被 12 个学生社团投入日常使用。',
    overlayLabel: '全栈服务运行中 — API 正常',
    stats: [
      { label: '活跃社团', value: '12' },
      { label: '月均活动', value: '180+' },
    ],
  },
]

/** 取全部作品 */
export function getWorks() {
  return WORKS
}

/** 按 id 取单个作品 */
export function getProjectById(id) {
  return WORKS.find((item) => item.id === id) || null
}
