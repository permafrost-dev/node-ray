### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [v1.20.2](https://github.com/permafrost-dev/node-ray/compare/v1.20.1...v1.20.2)

- Fix commonjs default issue, update target and module to ES2015 in tsconfig, and remove axios import from StackTraceGps [`732112c`](https://github.com/permafrost-dev/node-ray/commit/732112c74ff4f8f3bc8b5a3fe12649107ad3fc0a)
- Refactor DateImmutable.ts to use Dayjs constructor directlyThis commit updates the DateImmutable.ts file to use the Dayjs constructor directly instead of importing the module and then using a default export [`9a3ec95`](https://github.com/permafrost-dev/node-ray/commit/9a3ec951c0c1314a27df9b5aae3c40700e4c022c)

#### [v1.20.1](https://github.com/permafrost-dev/node-ray/compare/v1.20.0...v1.20.1)

> 11 May 2023

- Refactor StackTraceGps module to import source-map library properly [`30ba2a7`](https://github.com/permafrost-dev/node-ray/commit/30ba2a77c68d0b94a37102bf220c590a64ff5e03)
- update snapshots [`e03cbbc`](https://github.com/permafrost-dev/node-ray/commit/e03cbbc97733966f1b49ff79a49a6917bf563a40)
- disable tests that break on github actions [`2c52479`](https://github.com/permafrost-dev/node-ray/commit/2c52479d45a881527696d18745d3077ec1b587fa)

#### [v1.20.0](https://github.com/permafrost-dev/node-ray/compare/v1.19.10...v1.20.0)

> 11 May 2023

- fix tests, update snapshots, misc fixes [`e8eab3b`](https://github.com/permafrost-dev/node-ray/commit/e8eab3ba8f5cf44db9fb5cfee601b3348c800a40)
- continue fixing stacktraces [`1d9a38b`](https://github.com/permafrost-dev/node-ray/commit/1d9a38bdedc971abcf918fa5e69d470204eb0f44)
- Update README.md [`1b1ca5c`](https://github.com/permafrost-dev/node-ray/commit/1b1ca5c65f4f9435638c98c5a3376a39cec57cf3)

#### [v1.19.10](https://github.com/permafrost-dev/node-ray/compare/v1.19.9...v1.19.10)

> 11 May 2023

- fix bugs [`244a569`](https://github.com/permafrost-dev/node-ray/commit/244a5698cb067eacb11fadd87d9ed0d1a3a03613)
- wip [`d046da7`](https://github.com/permafrost-dev/node-ray/commit/d046da719368bc3cae963227e4d50a293ebf6a13)
- wip [`d424c0e`](https://github.com/permafrost-dev/node-ray/commit/d424c0e03c5797b26f0ce90efc185f203d07777f)

#### [v1.19.9](https://github.com/permafrost-dev/node-ray/compare/v1.19.8...v1.19.9)

> 11 May 2023

- Stackframes fix [`#172`](https://github.com/permafrost-dev/node-ray/pull/172)
- wip [`b47760a`](https://github.com/permafrost-dev/node-ray/commit/b47760a2223770bd3d53b06fc23703ef11012008)
- Refactor CallerPayload.ts to handle null function names and file names [`553a2d8`](https://github.com/permafrost-dev/node-ray/commit/553a2d8cfe0a309fd8265477e4037e059398c1d2)
- fix/disable broken tests, update snapshots [`4bd4fd3`](https://github.com/permafrost-dev/node-ray/commit/4bd4fd364f6f28218d5904399f1a1c96f79f385d)

#### [v1.19.8](https://github.com/permafrost-dev/node-ray/compare/v1.19.7...v1.19.8)

> 11 May 2023

- Refactor Ray.ts to import getSync instead of requiring itThe commit message is: "Import getSync instead of requiring it in Ray.ts" [`acc468b`](https://github.com/permafrost-dev/node-ray/commit/acc468b94d819bb4d5619293f7c4cee0d5c85865)

#### [v1.19.7](https://github.com/permafrost-dev/node-ray/compare/v1.19.6...v1.19.7)

> 11 May 2023

- fix import issues and broken tests [`b028e0b`](https://github.com/permafrost-dev/node-ray/commit/b028e0b319e49410045a3af49f2d6fcc9b7e7390)
- code cleanup [`522134f`](https://github.com/permafrost-dev/node-ray/commit/522134f8d4dfdd906541f7c4d9a66b3ee605834d)
- Add option to use Ray.standalone() method for initialization in README.md [`84ed00b`](https://github.com/permafrost-dev/node-ray/commit/84ed00ba7daca099cfa1378f781697c26b9f8562)

#### [v1.19.6](https://github.com/permafrost-dev/node-ray/compare/v1.19.5...v1.19.6)

> 11 May 2023

- Add TypeScript declaration files for web and node builds [`5b3d844`](https://github.com/permafrost-dev/node-ray/commit/5b3d844b11d32c2c1a350577f4a9622070e6690d)
- add eslintignore file [`c4a09bb`](https://github.com/permafrost-dev/node-ray/commit/c4a09bb50a839fb564bfe0cb344ebeec6cf74de2)
- Add auto-changelog to generate changelog automatically on version increment [`44d314f`](https://github.com/permafrost-dev/node-ray/commit/44d314f2e092e103cde2ba073ff8b64eb3d7af58)

#### [v1.19.5](https://github.com/permafrost-dev/node-ray/compare/v1.19.4...v1.19.5)

> 10 May 2023

- Minor updates [`#171`](https://github.com/permafrost-dev/node-ray/pull/171)
- add node 18 for running tests [`#170`](https://github.com/permafrost-dev/node-ray/pull/170)
- npm(deps-dev): bump dts-bundle-generator from 7.2.0 to 8.0.1 [`#167`](https://github.com/permafrost-dev/node-ray/pull/167)
- npm(deps-dev): bump concurrently from 7.6.0 to 8.0.1 [`#163`](https://github.com/permafrost-dev/node-ray/pull/163)
- npm(deps-dev): bump @types/node from 18.16.4 to 20.0.0 [`#169`](https://github.com/permafrost-dev/node-ray/pull/169)
- npm(deps-dev): bump typescript from 4.9.5 to 5.0.4 [`#166`](https://github.com/permafrost-dev/node-ray/pull/166)
- Bump dependabot/fetch-metadata from 1.3.6 to 1.4.0 [`#168`](https://github.com/permafrost-dev/node-ray/pull/168)
- npm(deps-dev): bump @rollup/plugin-terser from 0.2.1 to 0.4.0 [`#156`](https://github.com/permafrost-dev/node-ray/pull/156)
- Bump dependabot/fetch-metadata from 1.3.5 to 1.3.6 [`#157`](https://github.com/permafrost-dev/node-ray/pull/157)
- Bump actions/cache from 3.2.3 to 3.2.4 [`#158`](https://github.com/permafrost-dev/node-ray/pull/158)
- npm(deps-dev): bump @rollup/plugin-typescript from 10.0.1 to 11.0.0 [`#152`](https://github.com/permafrost-dev/node-ray/pull/152)
- Bump actions/cache from 3.2.2 to 3.2.3 [`#153`](https://github.com/permafrost-dev/node-ray/pull/153)
- Update all npm dependencies (2022-12-30) [`#150`](https://github.com/permafrost-dev/node-ray/pull/150)
- Bump actions/cache from 3.0.11 to 3.2.2 [`#149`](https://github.com/permafrost-dev/node-ray/pull/149)
- npm(deps): bump xml-formatter from 2.6.1 to 3.1.0 [`#144`](https://github.com/permafrost-dev/node-ray/pull/144)
- Update all npm dependencies (2022-12-16) [`#143`](https://github.com/permafrost-dev/node-ray/pull/143)
- wip [`68b7b56`](https://github.com/permafrost-dev/node-ray/commit/68b7b568e7217dcad8ac5cf686c4dc033c6eef25)
- wip [`042e2a4`](https://github.com/permafrost-dev/node-ray/commit/042e2a4d22b2ca715ef47453a9f9a5beff9d0b0e)
- Add RayScreenColors class to Ray class as a mixin [`80e8676`](https://github.com/permafrost-dev/node-ray/commit/80e86768660901e0f814f09b6e64875595c096c5)

#### [v1.19.4](https://github.com/permafrost-dev/node-ray/compare/v1.19.3...v1.19.4)

> 1 December 2022

- Bump dependencies [`#137`](https://github.com/permafrost-dev/node-ray/pull/137)
- npm(deps-dev): bump @types/uuid from 8.3.4 to 9.0.0 [`#136`](https://github.com/permafrost-dev/node-ray/pull/136)
- npm(deps-dev): bump dts-bundle-generator from 6.13.0 to 7.0.0 [`#120`](https://github.com/permafrost-dev/node-ray/pull/120)
- Bump dependabot/fetch-metadata from 1.3.4 to 1.3.5 [`#132`](https://github.com/permafrost-dev/node-ray/pull/132)
- Bump actions/cache from 3.0.10 to 3.0.11 [`#125`](https://github.com/permafrost-dev/node-ray/pull/125)
- Bump actions/cache from 3.0.9 to 3.0.10 [`#114`](https://github.com/permafrost-dev/node-ray/pull/114)
- wip [`72cf52e`](https://github.com/permafrost-dev/node-ray/commit/72cf52e06a333665d24634e33c611b6913766007)
- wip [`0b35c61`](https://github.com/permafrost-dev/node-ray/commit/0b35c6131aa7eb647a3d97f0fbb71ccbdf1bfbb3)

#### [v1.19.3](https://github.com/permafrost-dev/node-ray/compare/v1.19.2...v1.19.3)

> 1 December 2022

- remove random-int dependency [`e106bef`](https://github.com/permafrost-dev/node-ray/commit/e106bef0cd9d8736d3392c2f612307285ca1c8c1)
- bump dep versions [`97b9117`](https://github.com/permafrost-dev/node-ray/commit/97b91174dcdc43dfb56e6e0b2624516f60d0041d)
- update rollup configs [`cd48b8e`](https://github.com/permafrost-dev/node-ray/commit/cd48b8ed141dd2090bfd03871ee1048ce46af73f)

#### [v1.19.2](https://github.com/permafrost-dev/node-ray/compare/v1.19.1...v1.19.2)

> 7 October 2022

- update changelog [`9c92859`](https://github.com/permafrost-dev/node-ray/commit/9c92859952922881e95734d8fb3d1658ef9e9f1a)
- revert package upgrade [`ea06bf4`](https://github.com/permafrost-dev/node-ray/commit/ea06bf4ece4510da7d5d00b4259a281eea45a107)

#### [v1.19.1](https://github.com/permafrost-dev/node-ray/compare/v1.19.0...v1.19.1)

> 7 October 2022

- update test snapshots [`6f7fd52`](https://github.com/permafrost-dev/node-ray/commit/6f7fd52b6a54ba23e47f3f865a9b6f056c71c9b9)
- update test snapshots [`ff37b36`](https://github.com/permafrost-dev/node-ray/commit/ff37b36108733677ecbc99847ee6e8dc134dc9f1)
- fix deprecated ts-jest/utils use [`2d40b25`](https://github.com/permafrost-dev/node-ray/commit/2d40b25e3531f5823004c9a3dbc2f94747a59ce2)

#### [v1.19.0](https://github.com/permafrost-dev/node-ray/compare/v1.18.0...v1.19.0)

> 7 October 2022

- add confetti [`#102`](https://github.com/permafrost-dev/node-ray/pull/102)
- Bump dependabot/fetch-metadata from 1.3.3 to 1.3.4 [`#113`](https://github.com/permafrost-dev/node-ray/pull/113)
- Bump actions/cache from 3.0.8 to 3.0.9 [`#112`](https://github.com/permafrost-dev/node-ray/pull/112)
- Bump actions/cache from 3.0.7 to 3.0.8 [`#99`](https://github.com/permafrost-dev/node-ray/pull/99)
- Bump actions/cache from 3.0.6 to 3.0.7 [`#97`](https://github.com/permafrost-dev/node-ray/pull/97)
- Bump actions/cache from 3.0.5 to 3.0.6 [`#96`](https://github.com/permafrost-dev/node-ray/pull/96)
- Bump actions/cache from 3.0.4 to 3.0.5 [`#94`](https://github.com/permafrost-dev/node-ray/pull/94)
- npm(deps-dev): bump @types/node from 17.0.45 to 18.0.0 [`#87`](https://github.com/permafrost-dev/node-ray/pull/87)
- Bump dependabot/fetch-metadata from 1.3.1 to 1.3.2 [`#90`](https://github.com/permafrost-dev/node-ray/pull/90)
- Bump actions/cache from 3.0.3 to 3.0.4 [`#86`](https://github.com/permafrost-dev/node-ray/pull/86)
- npm(deps-dev): bump husky from 7.0.4 to 8.0.1 [`#78`](https://github.com/permafrost-dev/node-ray/pull/78)
- npm(deps-dev): bump lint-staged from 12.5.0 to 13.0.0 [`#81`](https://github.com/permafrost-dev/node-ray/pull/81)
- Bump actions/cache from 3.0.2 to 3.0.3 [`#80`](https://github.com/permafrost-dev/node-ray/pull/80)
- npm(deps-dev): bump @rollup/plugin-commonjs from 21.1.0 to 22.0.0 [`#75`](https://github.com/permafrost-dev/node-ray/pull/75)
- Bump github/codeql-action from 1 to 2 [`#77`](https://github.com/permafrost-dev/node-ray/pull/77)
- npm(deps): bump axios from 0.26.1 to 0.27.0 [`#76`](https://github.com/permafrost-dev/node-ray/pull/76)
- Bump dependabot/fetch-metadata from 1.3.0 to 1.3.1 [`#74`](https://github.com/permafrost-dev/node-ray/pull/74)
- Bump actions/cache from 3.0.1 to 3.0.2 [`#73`](https://github.com/permafrost-dev/node-ray/pull/73)
- Bump codecov/codecov-action from 2 to 3 [`#72`](https://github.com/permafrost-dev/node-ray/pull/72)
- Bump actions/cache from 2 to 3.0.1 [`#71`](https://github.com/permafrost-dev/node-ray/pull/71)
- npm(deps-dev): bump ts-mixer from 5.4.1 to 6.0.1 [`#69`](https://github.com/permafrost-dev/node-ray/pull/69)
- npm(deps-dev): bump dts-bundle-generator from 5.9.0 to 6.5.0 [`#56`](https://github.com/permafrost-dev/node-ray/pull/56)
- npm(deps-dev): bump @types/node from 16.11.25 to 17.0.21 [`#62`](https://github.com/permafrost-dev/node-ray/pull/62)
- npm(deps-dev): bump @rollup/plugin-commonjs from 19.0.2 to 21.0.2 [`#63`](https://github.com/permafrost-dev/node-ray/pull/63)
- Bump actions/checkout from 2 to 3 [`#67`](https://github.com/permafrost-dev/node-ray/pull/67)
- Bump actions/setup-node from 2 to 3 [`#66`](https://github.com/permafrost-dev/node-ray/pull/66)
- Bump dependabot/fetch-metadata from 1.2.1 to 1.3.0 [`#68`](https://github.com/permafrost-dev/node-ray/pull/68)
- Bump dependabot/fetch-metadata from 1.2.0 to 1.2.1 [`#64`](https://github.com/permafrost-dev/node-ray/pull/64)
- Bump dependabot/fetch-metadata from 1.1.1 to 1.2.0 [`#60`](https://github.com/permafrost-dev/node-ray/pull/60)
- npm(deps): bump axios from 0.25.0 to 0.26.0 [`#58`](https://github.com/permafrost-dev/node-ray/pull/58)
- npm(deps): bump axios from 0.24.0 to 0.25.0 [`#54`](https://github.com/permafrost-dev/node-ray/pull/54)
- npm(deps-dev): bump @rollup/plugin-replace from 2.4.2 to 3.0.1 [`#48`](https://github.com/permafrost-dev/node-ray/pull/48)
- npm(deps-dev): bump concurrently from 6.5.1 to 7.0.0 [`#50`](https://github.com/permafrost-dev/node-ray/pull/50)
- add confetti to test.js [`2a64feb`](https://github.com/permafrost-dev/node-ray/commit/2a64feb118d7e2292448242f3c18b17a800e38f4)
- add confetti to readme [`d8f0050`](https://github.com/permafrost-dev/node-ray/commit/d8f0050611a697f06f6d9371e1eae4e00b16ec42)
- Update README.md [`156fd59`](https://github.com/permafrost-dev/node-ray/commit/156fd596a4dfdff9b4636b28787e83bbc11c5154)

#### [v1.18.0](https://github.com/permafrost-dev/node-ray/compare/v1.17.0...v1.18.0)

> 14 January 2022

- Add new features [`#51`](https://github.com/permafrost-dev/node-ray/pull/51)
- add `withCredentials = false` header [`#49`](https://github.com/permafrost-dev/node-ray/pull/49)
- npm(deps): bump axios from 0.21.4 to 0.24.0 [`#45`](https://github.com/permafrost-dev/node-ray/pull/45)
- npm(deps-dev): bump @types/node from 15.14.1 to 16.0.0 [`#29`](https://github.com/permafrost-dev/node-ray/pull/29)
- add test snapshot [`a97bc1a`](https://github.com/permafrost-dev/node-ray/commit/a97bc1a832fd47ddc37e826779e0a2bb7c92c7bf)
- add docs for screenColor, projectName methods [`71565a8`](https://github.com/permafrost-dev/node-ray/commit/71565a81edf534e92041a65781fffb44885d52dc)
- add unit tests [`e009e64`](https://github.com/permafrost-dev/node-ray/commit/e009e643911771be196aaf50aa0e44f509f63d78)

#### [v1.17.0](https://github.com/permafrost-dev/node-ray/compare/v1.16.0...v1.17.0)

> 19 November 2021

- Make exception/error payloads red by default [`#27`](https://github.com/permafrost-dev/node-ray/pull/27)
- update docs [`1a5207c`](https://github.com/permafrost-dev/node-ray/commit/1a5207c12ca877b04e67fbe5bf19e2244c2cc47c)
- various updates/changes, add label method [`d18f2ca`](https://github.com/permafrost-dev/node-ray/commit/d18f2ca44ce656cc246c20e5a31ff4d2722e2fad)
- add FUNDING.yml [`ae4ddd0`](https://github.com/permafrost-dev/node-ray/commit/ae4ddd0e724dbe9df2656b06e3c545e333207132)

#### [v1.16.0](https://github.com/permafrost-dev/node-ray/compare/v1.15.0...v1.16.0)

> 24 June 2021

- Add if() method [`#26`](https://github.com/permafrost-dev/node-ray/pull/26)
- Add once() method [`#25`](https://github.com/permafrost-dev/node-ray/pull/25)
- Add limit() method [`#24`](https://github.com/permafrost-dev/node-ray/pull/24)
- Add rate limiter [`#23`](https://github.com/permafrost-dev/node-ray/pull/23)
- update changelog [`0df8187`](https://github.com/permafrost-dev/node-ray/commit/0df8187e5bf53f988cf241e67edb89cc127a4357)
- update test snapshot [`5a9c88c`](https://github.com/permafrost-dev/node-ray/commit/5a9c88c4666f63dc15fa86a4d3d293677567c351)
- update test names [`f621c03`](https://github.com/permafrost-dev/node-ray/commit/f621c03b02d9934ed4626bf3bc5d7e3766323421)

#### [v1.15.0](https://github.com/permafrost-dev/node-ray/compare/v1.14.0...v1.15.0)

> 30 May 2021

- update imports, add test for text() [`c820fae`](https://github.com/permafrost-dev/node-ray/commit/c820fae04412abb3b30bc5a60d3140a6e32795d4)
- update changelog, readme [`0f36936`](https://github.com/permafrost-dev/node-ray/commit/0f36936e650973daf528703c0eb5d0a0f1b92109)
- add text() method [`ca71fce`](https://github.com/permafrost-dev/node-ray/commit/ca71fce605b7cf0dc53b52614b8b85114bde057f)

#### [v1.14.0](https://github.com/permafrost-dev/node-ray/compare/v1.13.1...v1.14.0)

> 28 May 2021

- npm(deps-dev): bump @types/node from 14.14.42 to 15.0.0 [`#19`](https://github.com/permafrost-dev/node-ray/pull/19)
- update changelog [`bfbb0ea`](https://github.com/permafrost-dev/node-ray/commit/bfbb0eadf95a6009e92561700f2613a40fad8a23)
- update test snapshots [`f0f172c`](https://github.com/permafrost-dev/node-ray/commit/f0f172ca1ebc9f96a20994e30c359c205518b586)
- fix issue with sent_payload_callback causing a stack overflow [`13f27d7`](https://github.com/permafrost-dev/node-ray/commit/13f27d771e00c4021ea18dcdc9ff25adf320bd82)

#### [v1.13.1](https://github.com/permafrost-dev/node-ray/compare/v1.13.0...v1.13.1)

> 27 May 2021

- npm(deps-dev): bump @rollup/plugin-commonjs from 17.1.0 to 18.0.0 [`#16`](https://github.com/permafrost-dev/node-ray/pull/16)
- update changelog [`0ca4dde`](https://github.com/permafrost-dev/node-ray/commit/0ca4dde119468e94bb9a3fc7a31d633ed83d2536)
- wip [`a43c457`](https://github.com/permafrost-dev/node-ray/commit/a43c457a939c9cdb6c86815ccdd2e19704f34894)
- change intercept_console_log default to false when calling create() [`d353542`](https://github.com/permafrost-dev/node-ray/commit/d353542e6125c5500c4aacee42c42c905bf878e0)

#### [v1.13.0](https://github.com/permafrost-dev/node-ray/compare/v1.12.0...v1.13.0)

> 2 April 2021

- update changelog [`4a7dc91`](https://github.com/permafrost-dev/node-ray/commit/4a7dc91ffb045d5080b6bde27a4900c638e116a4)
- add section/examples for `sending_payload_callback` and `sent_payload_callback` settings [`44dccf5`](https://github.com/permafrost-dev/node-ray/commit/44dccf5681a626b45f9d721db4977a449c4c1628)
- add `sending_payload_callback` and `sent_payload_callback` settings [`a97a4af`](https://github.com/permafrost-dev/node-ray/commit/a97a4af0c6f70418f8efcf146dee3dba79e7e0ba)

#### [v1.12.0](https://github.com/permafrost-dev/node-ray/compare/v1.11.0...v1.12.0)

> 12 March 2021

- update changelog [`e58317f`](https://github.com/permafrost-dev/node-ray/commit/e58317f3e68c3233a20d5c5f0a9cf331c01301ef)
- update docs [`e253877`](https://github.com/permafrost-dev/node-ray/commit/e253877272ed753e347847186fe832788f7434f0)
- make sure macros persist between instances of the Ray class [`6b0ea94`](https://github.com/permafrost-dev/node-ray/commit/6b0ea94d4e4f266188339e69b26bc4bc9e07235a)

#### [v1.11.0](https://github.com/permafrost-dev/node-ray/compare/v1.10.1...v1.11.0)

> 10 March 2021

- update test snapshots [`af5b45d`](https://github.com/permafrost-dev/node-ray/commit/af5b45d1aba25cdcf203b2ef2cfd97f4b044ecda)
- update changelog [`d685953`](https://github.com/permafrost-dev/node-ray/commit/d6859535b3d1573c34e5a8937bc91e84365b0b2e)
- add scheme to defaultSettings [`9c78c03`](https://github.com/permafrost-dev/node-ray/commit/9c78c034bce91008ecbbfe40bb6c503cfba2cedd)

#### [v1.10.1](https://github.com/permafrost-dev/node-ray/compare/v1.10.0...v1.10.1)

> 6 March 2021

- update snapshots [`9c1e893`](https://github.com/permafrost-dev/node-ray/commit/9c1e893d7ff68ae25cd577c1f3d56158060aaaea)
- update changelog [`4485ca8`](https://github.com/permafrost-dev/node-ray/commit/4485ca80bc3a6920a667f5026c139a3b8993888a)
- fix error thrown when frame filename does not exist [`7b92c36`](https://github.com/permafrost-dev/node-ray/commit/7b92c368eccf71654d1515223dde3fc8440b57ef)

#### [v1.10.0](https://github.com/permafrost-dev/node-ray/compare/v1.9.2...v1.10.0)

> 3 March 2021

- update changelog [`3d6556c`](https://github.com/permafrost-dev/node-ray/commit/3d6556c4117502e80f8b10c2035f1590da2a7c80)
- add 'hostname' to origin (syncs with spatie/ray 1.21.0 & PR 332) [`96b96fc`](https://github.com/permafrost-dev/node-ray/commit/96b96fcf6f537da3ee8a6c23ed90bb99b338d854)
- add info for exception() method [`8f161a5`](https://github.com/permafrost-dev/node-ray/commit/8f161a5e3325b7b3cbb989758ddb49ca34f2c01e)

#### [v1.9.2](https://github.com/permafrost-dev/node-ray/compare/v1.9.1...v1.9.2)

> 2 March 2021

- update changelog [`c495576`](https://github.com/permafrost-dev/node-ray/commit/c4955760d3b2c1af3adbb48dbce5bdad83bf3b5f)
- update changelog [`d21f798`](https://github.com/permafrost-dev/node-ray/commit/d21f79869bf833099146530e2e2de45722b72f52)

#### [v1.9.1](https://github.com/permafrost-dev/node-ray/compare/v1.9.0...v1.9.1)

> 1 March 2021

- update import, bump required version for permafrost-dev/pretty-format to 1.1.0 [`66d4f2e`](https://github.com/permafrost-dev/node-ray/commit/66d4f2e3450e911e21014113a81638aa47485389)
- fix import [`73998d8`](https://github.com/permafrost-dev/node-ray/commit/73998d8671ac60233ea2b183cbddd84b165675a9)

#### [v1.9.0](https://github.com/permafrost-dev/node-ray/compare/v1.8.4...v1.9.0)

> 1 March 2021

- update changelog [`5d68724`](https://github.com/permafrost-dev/node-ray/commit/5d68724340ddb052808a031ec7afa2e1550100f7)
- update configuration info for NodeJS to include disabling calls to ray() with NODE_ENV [`6bbb860`](https://github.com/permafrost-dev/node-ray/commit/6bbb8604822bbf5ce250f2cc29b4b8dd1d8ebbf0)
- skip sending data to Ray when NODE_ENV is "production" or "staging" [`8990a77`](https://github.com/permafrost-dev/node-ray/commit/8990a77df2ac7c332a69b3adee5f78f260efe639)

#### [v1.8.4](https://github.com/permafrost-dev/node-ray/compare/v1.8.3...v1.8.4)

> 1 March 2021

- update changelog [`c420268`](https://github.com/permafrost-dev/node-ray/commit/c420268912257f511dd6213714a3a5d3795a2982)
- update rollup config [`f83a3f8`](https://github.com/permafrost-dev/node-ray/commit/f83a3f8bdd0025c317c3717921103e1f3f162505)

#### [v1.8.3](https://github.com/permafrost-dev/node-ray/compare/v1.8.2...v1.8.3)

> 1 March 2021

- update changelog [`8da95ab`](https://github.com/permafrost-dev/node-ray/commit/8da95ab2b640dedf1d19b9a2b6a26a990331ed84)
- use @permafrost-dev/pretty-format package instead of pretty-format [`af4dcb7`](https://github.com/permafrost-dev/node-ray/commit/af4dcb7c0aa01ced9b10de3fe46a07c4e1bb9cfc)

#### [v1.8.2](https://github.com/permafrost-dev/node-ray/compare/v1.8.1...v1.8.2)

> 1 March 2021

- update changelog [`b05a6ba`](https://github.com/permafrost-dev/node-ray/commit/b05a6ba208b2c513af071b14331360501a4bf8ca)
- add tslib package [`709b173`](https://github.com/permafrost-dev/node-ray/commit/709b1733963491f6626e317caf4732a546502e3d)
- update changelog [`447a50c`](https://github.com/permafrost-dev/node-ray/commit/447a50c4284e99f6352f858763d6914cd69364a0)

#### [v1.8.1](https://github.com/permafrost-dev/node-ray/compare/v1.8.0...v1.8.1)

> 1 March 2021

- limit prettyFormat plugins to DOM plugins [`61b5109`](https://github.com/permafrost-dev/node-ray/commit/61b5109dec5b2896b5c83da95fb049434fcb2e88)
- add updated test snapshot [`0788e7e`](https://github.com/permafrost-dev/node-ray/commit/0788e7e736ec8ac7a2f7077bf5f6a9fb005bbc28)
- fix frame filename for caller test snapshot [`f9dfdcf`](https://github.com/permafrost-dev/node-ray/commit/f9dfdcfaf89cd81caf0d712717a7f59b3d235adf)

#### [v1.8.0](https://github.com/permafrost-dev/node-ray/compare/v1.7.0...v1.8.0)

> 12 February 2021

- update test snapshots [`ea7ad9b`](https://github.com/permafrost-dev/node-ray/commit/ea7ad9b651c0d0ce904785fe9e0ee5c58a6143e0)
- testing changes [`cebaea0`](https://github.com/permafrost-dev/node-ray/commit/cebaea062680e013b81c6a0edaf7ba4f336fe158)
- update changelog [`786c8ef`](https://github.com/permafrost-dev/node-ray/commit/786c8efb3582762f6ed219f1687fc1896ef55986)

#### [v1.7.0](https://github.com/permafrost-dev/node-ray/compare/v1.6.3...v1.7.0)

> 11 February 2021

- always set memory usage in measure payloads to 0 [`a8f4522`](https://github.com/permafrost-dev/node-ray/commit/a8f4522333a5148aac25ef0bd4532b53d50f6dac)
- update changelog [`3a1ffbc`](https://github.com/permafrost-dev/node-ray/commit/3a1ffbcbb6543c1f538375065261b5906cc2f7b9)
- refactor resuming/stopping exection after calling pause() so it behaves as expected [`0d9e244`](https://github.com/permafrost-dev/node-ray/commit/0d9e2446a0dc276241e4373a389dd69c46d86116)

#### [v1.6.3](https://github.com/permafrost-dev/node-ray/compare/v1.6.2...v1.6.3)

> 10 February 2021

- update changelog [`a637ed7`](https://github.com/permafrost-dev/node-ray/commit/a637ed71466b31fcfc8b2da7cd9de4ee9a54b3c4)
- update available status on object creation [`469f874`](https://github.com/permafrost-dev/node-ray/commit/469f874fb0f848db27d1ed29f43ff22f3abd1b9d)
- add minor helper methods [`b369a94`](https://github.com/permafrost-dev/node-ray/commit/b369a94f81ecf283efe9a3b1190880357114f95d)

#### [v1.6.2](https://github.com/permafrost-dev/node-ray/compare/v1.6.1...v1.6.2)

> 10 February 2021

- update changelog, readme [`4a13c71`](https://github.com/permafrost-dev/node-ray/commit/4a13c71eff74e656008a63896857edeae7c27df1)
- fix implementation [`c8af504`](https://github.com/permafrost-dev/node-ray/commit/c8af504488f24d463d7c90654a4ca14f22fc7d01)
- change the way available status is reset to avoid process hanging [`831b90e`](https://github.com/permafrost-dev/node-ray/commit/831b90e11ed56c4492c21c0d8ca7914c79cf1b48)

#### [v1.6.1](https://github.com/permafrost-dev/node-ray/compare/v1.6.0...v1.6.1)

> 10 February 2021

- update changelog [`e2e47ce`](https://github.com/permafrost-dev/node-ray/commit/e2e47ce948842f06133ebd0014d83879bcf90f9e)
- enable isRayAvailable(), updateRayAvailability(); availability is refreshed every 20 seconds [`17ff1ba`](https://github.com/permafrost-dev/node-ray/commit/17ff1ba9c42e1b64aef0c3fbf796b35dfe5f3f58)
- fix bug where Ray.client was accessed even if it didn't exist [`52fe8d3`](https://github.com/permafrost-dev/node-ray/commit/52fe8d308e790d693f8410533ae386d24f159172)

#### [v1.6.0](https://github.com/permafrost-dev/node-ray/compare/v1.5.3...v1.6.0)

> 10 February 2021

- ignore rollup config files [`0e62d13`](https://github.com/permafrost-dev/node-ray/commit/0e62d138f4532f08782c1e4ca272207862c53bc1)
- apply formatting [`97c6f3b`](https://github.com/permafrost-dev/node-ray/commit/97c6f3b72a756fa9b6041c4ef3fae5214a071fe9)
- update changelog [`3dcc62b`](https://github.com/permafrost-dev/node-ray/commit/3dcc62b0814f2a35708bcd07e2083aad6efe48e0)

#### [v1.5.3](https://github.com/permafrost-dev/node-ray/compare/v1.5.2...v1.5.3)

> 9 February 2021

- update changelog [`18efeca`](https://github.com/permafrost-dev/node-ray/commit/18efeca8b9c12fe4ba1523bc92902866584bf608)
- add node export variant [`fc69cd0`](https://github.com/permafrost-dev/node-ray/commit/fc69cd0a2fac980e7fe3ff24019e036e0aebdb27)
- change import to require and export to module.exports [`c428142`](https://github.com/permafrost-dev/node-ray/commit/c4281428556ae49326e56c547ee6c7f447a8e61c)

#### [v1.5.2](https://github.com/permafrost-dev/node-ray/compare/v1.5.1...v1.5.2)

> 9 February 2021

- update changelog [`6920f8b`](https://github.com/permafrost-dev/node-ray/commit/6920f8bcac95e732b2e47895a9ac815327069355)
- update & optimize run-tests workflow [`dc5aa87`](https://github.com/permafrost-dev/node-ray/commit/dc5aa8712ea4f873cee08945a6cb040ffa3bfb53)
- split StopwatchEvent into a separate file, updated and added additional tests [`1d8068b`](https://github.com/permafrost-dev/node-ray/commit/1d8068bf2f4431a9d384ccb47b9c241b97b08b14)

#### [v1.5.1](https://github.com/permafrost-dev/node-ray/compare/v1.5.0...v1.5.1)

> 9 February 2021

- update tests [`bf09994`](https://github.com/permafrost-dev/node-ray/commit/bf099944789e867241c903a9e79e693ed8d228b1)

#### [v1.5.0](https://github.com/permafrost-dev/node-ray/compare/v1.4.4...v1.5.0)

> 9 February 2021

- add measure(), measureClosure(), and stopTime() methods; add Stopwatch class for timing duration of method calls [`6d7cf88`](https://github.com/permafrost-dev/node-ray/commit/6d7cf88f7378fb02ec0f77fe1a6bab80de8b3c94)
- update docs [`62fe509`](https://github.com/permafrost-dev/node-ray/commit/62fe509e87b36523445da6304d3e18dbf8c5dafc)
- update tests [`d771052`](https://github.com/permafrost-dev/node-ray/commit/d7710526fe829c6fd9dcef38d747cf2c0c5dacbe)

#### [v1.4.4](https://github.com/permafrost-dev/node-ray/compare/v1.4.3...v1.4.4)

> 9 February 2021

- update version in changelog [`6ad1a2c`](https://github.com/permafrost-dev/node-ray/commit/6ad1a2c8c5f07a7164096b67ddebabf7f739b004)
- update readme, changelog [`3cbc820`](https://github.com/permafrost-dev/node-ray/commit/3cbc8209304199a926f2ff49df9a4de20cdfb3e7)
- add web module variant [`34527a9`](https://github.com/permafrost-dev/node-ray/commit/34527a907f55f9cbb7e56a93d8464d4d4b4e82df)

#### [v1.4.3](https://github.com/permafrost-dev/node-ray/compare/v1.4.2...v1.4.3)

> 8 February 2021

- change esm to use .mjs extension [`3746ef5`](https://github.com/permafrost-dev/node-ray/commit/3746ef552de7a28a28ffa062d7265c9317f30eed)

#### [v1.4.2](https://github.com/permafrost-dev/node-ray/compare/v1.4.1...v1.4.2)

> 8 February 2021

- update changelog [`7414326`](https://github.com/permafrost-dev/node-ray/commit/7414326415b45eac8b5de5207a403ae7f9cca3ae)
- use .mjs extensions for esm modules [`272cb34`](https://github.com/permafrost-dev/node-ray/commit/272cb34430f6023f59b3ff9ffcc6456d6c347315)

#### [v1.4.1](https://github.com/permafrost-dev/node-ray/compare/v1.4.0...v1.4.1)

> 8 February 2021

- update changelog [`7567c3c`](https://github.com/permafrost-dev/node-ray/commit/7567c3c487ffe7acd0b01c3912389ac53e7b052d)
- add section on using with Laravel mix [`942f3a4`](https://github.com/permafrost-dev/node-ray/commit/942f3a4db761a18a969b6cfda16605746897a8ba)
- change the output files to all end with js [`8c11fab`](https://github.com/permafrost-dev/node-ray/commit/8c11fab2a3a1915cbb466d6ddbc67ea58993cbd8)

#### [v1.4.0](https://github.com/permafrost-dev/node-ray/compare/v1.3.0...v1.4.0)

> 7 February 2021

- Update README.md [`#4`](https://github.com/permafrost-dev/node-ray/pull/4)
- update changelog, readme, usage docs [`fbd28c5`](https://github.com/permafrost-dev/node-ray/commit/fbd28c5b7f8bd069e42231dbb8f62b8d865408a9)
- add error(), date() methods (DatePayload is the original CarbonPayload class) [`ea4bd66`](https://github.com/permafrost-dev/node-ray/commit/ea4bd664f016a650239c7e5da79cad8541399e25)
- add dayjs package [`0dc9f8c`](https://github.com/permafrost-dev/node-ray/commit/0dc9f8cc0d42b8e42924e235da453da03e0613e1)

#### [v1.3.0](https://github.com/permafrost-dev/node-ray/compare/1.2.2...v1.3.0)

> 7 February 2021

- fix raw html displaying instead of rendered html with calls like `ray({hello: 'world'})` [`226ccd0`](https://github.com/permafrost-dev/node-ray/commit/226ccd0b4fe29c0474d3524f0cf2b009647eeef7)

#### [v1.2.2](https://github.com/permafrost-dev/node-ray/compare/v1.2.1...v1.2.2)

> 7 February 2021

- remove reference to EOL import from os module [`721a043`](https://github.com/permafrost-dev/node-ray/commit/721a04324dfe0c4d1ac1fd868448225002c84974)

#### [v1.2.1](https://github.com/permafrost-dev/node-ray/compare/1.2.0...v1.2.1)

> 7 February 2021

- change codeql scanning to once per day using a cron schedule instead of on push  as each run takes 2+ min [`38b638e`](https://github.com/permafrost-dev/node-ray/commit/38b638e9e67e80c13263459862b1603e84c6111b)
- update readme for standalone.js use [`2fab1bc`](https://github.com/permafrost-dev/node-ray/commit/2fab1bc08657c1cc9b5d8db2d59d52c9c58a95c2)
- fix incorrect quote char escaping [`19f2f7f`](https://github.com/permafrost-dev/node-ray/commit/19f2f7f220d589e68eda69247c8f6e878d1298ec)

#### [v1.2.0](https://github.com/permafrost-dev/node-ray/compare/1.1.0...v1.2.0)

> 7 February 2021

- add available environments doc [`c05eb6d`](https://github.com/permafrost-dev/node-ray/commit/c05eb6de4eff7143095dd1358d23ff4c0c34e4ee)
- add support for browser environments/bundles, so the package can be used for NodeJS/ES6/TypeScript projects, regardless of the target environment [`43b9436`](https://github.com/permafrost-dev/node-ray/commit/43b94366ada300e3a5ddb442079d1067d1905fb2)

#### [v1.1.0](https://github.com/permafrost-dev/node-ray/compare/1.0.0...v1.1.0)

> 7 February 2021

- update changelog [`d898525`](https://github.com/permafrost-dev/node-ray/commit/d898525bd17e445edfc573e903b3af302f852c75)
- add reference/section on className() method [`18c4486`](https://github.com/permafrost-dev/node-ray/commit/18c4486852a536f52d8b0209af1046285538a8c7)
- add section on working with screens [`cf12acd`](https://github.com/permafrost-dev/node-ray/commit/cf12acdcd6709afb1e2c6415273f8144d558ab11)

#### 1.0.0

> 6 February 2021

- wip [`19cee55`](https://github.com/permafrost-dev/node-ray/commit/19cee551cb36d7acb607241ab039d7699f53d1b3)
- adjust version injector plugin location [`16965fd`](https://github.com/permafrost-dev/node-ray/commit/16965fdf7d9eb3bf05d9db42eae66f6a9a939f17)
- wip [`974b90d`](https://github.com/permafrost-dev/node-ray/commit/974b90d5240dbd72e35064ebc7b4830f7a46d9c7)
