/**
 * @description Get user browser versions and system information
 * @param {string='zh-cn' | 'en'} lang Information returning Chinese is also in English
 * @constructor
 */
export default function BrowserType(lang: 'zh-cn' | 'en' = 'en') {
  // Weight: System + System Version> Platform> Kernel + Carrier + Nuclear Version + Vector Version> Shell + Shell Version
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    ua
      .match(regexp)
      ?.toString()
      .replace(/[^0-9|_.]/g, '')
      .replace(/_/g, '.');
  // system
  const system =
    new Map([
      [testUa(/windows|win32|win64|wow32|wow64/g), 'windows'], // Windows system
      [testUa(/macintosh|macintel/g), 'macos'], // mACOS system
      [testUa(/x11/g), 'linux'], // Linux system
      [testUa(/android|adr/g), 'android'], // Android system
      [testUa(/ios|iphone|ipad|ipod|iwatch/g), 'ios'], // iOS system
    ]).get(true) || 'unknow';

  // system version
  const systemVs =
    new Map([
      [
        'windows',
        new Map([
          [testUa(/windows nt 5.0|windows 2000/g), '2000'],
          [testUa(/windows nt 5.1|windows xp/g), 'xp'],
          [testUa(/windows nt 5.2|windows 2003/g), '2003'],
          [testUa(/windows nt 6.0|windows vista/g), 'vista'],
          [testUa(/windows nt 6.1|windows 7/g), '7'],
          [testUa(/windows nt 6.2|windows 8/g), '8'],
          [testUa(/windows nt 6.3|windows 8.1/g), '8.1'],
          [testUa(/windows nt 10.0|windows 10/g), '10'],
        ]).get(true),
      ],
      ['macos', testVs(/os x [\d._]+/g)],
      ['android', testVs(/android [\d._]+/g)],
      ['ios', testVs(/os [\d._]+/g)],
    ]).get(system) || 'unknow';

  // platform
  let platform = 'unknow';
  if (system === 'windows' || system === 'macos' || system === 'linux') {
    platform = 'desktop'; // Desktop end
  } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
    platform = 'mobile'; // Moving end
  }
  // Core and carrier
  const [engine = 'unknow', supporter = 'unknow'] = new Map([
    [
      testUa(/applewebkit/g),
      [
        'webkit',
        new Map([
          // Webkit kernel
          [testUa(/safari/g), 'safari'], // Safari browser
          [testUa(/chrome/g), 'chrome'], // Chrome browser
          [testUa(/opr/g), 'opera'], // Opera browser
          [testUa(/edge/g), 'edge'], // Edge browser
        ]).get(true),
      ] || 'unknow',
    ], // [Webkit kernel, XXX browser]
    [testUa(/gecko/g) && testUa(/firefox/g), ['gecko', 'firefox']], // [Gecko kernel,Firefox browser]
    [testUa(/presto/g), ['presto', 'opera']], // [PRESTO kernel,Opera browser]
    [testUa(/trident|compatible|msie/g), ['trident', 'iexplore']], // [Trident core,Iexplore browser]
  ]).get(true) || ['unknow', 'unknow'];

  // Kernel version
  const engineVs =
    new Map([
      ['webkit', testVs(/applewebkit\/[\d._]+/g)],
      ['gecko', testVs(/gecko\/[\d._]+/g)],
      ['presto', testVs(/presto\/[\d._]+/g)],
      ['trident', testVs(/trident\/[\d._]+/g)],
    ]).get(engine) || 'unknow';

  // Vectors
  const supporterVs =
    new Map([
      ['firefox', testVs(/firefox\/[\d._]+/g)],
      ['opera', testVs(/opr\/[\d._]+/g)],
      ['iexplore', testVs(/(msie [\d._]+)|(rv:[\d._]+)/g)],
      ['edge', testVs(/edge\/[\d._]+/g)],
      ['safari', testVs(/version\/[\d._]+/g)],
      ['chrome', testVs(/chrome\/[\d._]+/g)],
    ]).get(supporter) || 'unknow';

  // Shell and shell version
  const [shell = 'none', shellVs = 'unknow'] = new Map([
    [testUa(/micromessenger/g), ['wechat', testVs(/micromessenger\/[\d._]+/g)]], // [WeChat browser,]
    [testUa(/qqbrowser/g), ['qq', testVs(/qqbrowser\/[\d._]+/g)]], // [QQ browser,]
    [testUa(/ucbrowser/g), ['uc', testVs(/ucbrowser\/[\d._]+/g)]], // [UC browser,]
    [testUa(/qihu 360se/g), ['360', 'unknow']], // [360 browser(No version),]
    [testUa(/2345explorer/g), ['2345', testVs(/2345explorer\/[\d._]+/g)]], // [2345 browser,]
    [testUa(/metasr/g), ['sougou', 'unknow']], // [Sogou browser(No version),]
    [testUa(/lbbrowser/g), ['liebao', 'unknow']], // [Cheetah browser(No version),]
    [testUa(/maxthon/g), ['maxthon', testVs(/maxthon\/[\d._]+/g)]], // [Tour browser,]
  ]).get(true) || ['none', 'unknow'];

  return {
    'zh-cn': Object.assign(
      {
        内核: engine, // Nuclear: Webkit Gecko Presto Trident
        内核版本: engineVs, // Kernel version
        平台: platform, // Platform: Desktop Mobile
        载体: supporter, // Carrier: Chrome Safari Firefox Opera IExplore Edge
        载体版本: supporterVs, // Vectors
        系统: system, // System: Windows Macos Linux Android iOS
        系统版本: systemVs, // system version
      },
      shell === 'none'
        ? {}
        : {
            外壳: shell, // Shell: Wechat QQ UC 360 2345 Sougou Liebao Maxthon
            外壳版本: shellVs, // Shell version
          }
    ),
    en: Object.assign(
      {
        engine, // Nuclear: Webkit Gecko Presto Trident
        engineVs, // Kernel version
        platform, // platform: desktop mobile
        supporter, // Carrier: chrome safari firefox opera iexplore edge
        supporterVs, // Vectors
        system, // system: windows macos linux android ios
        systemVs, // system version
      },
      shell === 'none'
        ? {}
        : {
            shell, // shell: wechat qq uc 360 2345 sougou liebao maxthon
            shellVs, // Shell version
          }
    ),
  }[lang];
}
