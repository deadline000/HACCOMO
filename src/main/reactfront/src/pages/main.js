// 헤더
import React,{ useContext } from 'react';
import { AuthContext } from './provider/AuthProvider'; // 토큰+로그인정보

const Main = () => {
    const { isLogin } = useContext(AuthContext);

    // 회원가입 버튼 클릭 시
    const goRegister = () => {
        if (isLogin) {
            alert("이미 로그인되어 있습니다.");
            return;
        } else {
            window.location.href = '/register';
        }
    };

    return (
        <main>
            <article className="main_sec1">
                <section>
                    <div>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <h2><span>&nbsp;하꼬</span>들이여, <span>모</span>여라!</h2>
                        <h1>1인 크리에이터 커뮤니티&nbsp;<br />HA<span>CCO</span>MO&nbsp;</h1>
                        
                        <a href="/creator">크리에이터 둘러보기&nbsp;&nbsp; <span>▶</span></a>
                    </div>
                </section>
           </article>
           
           <article className="main_sec2">
                <section>
                    <h3>Let's Enjoy Together!</h3>
                    <h2>함께하면 더 재미있어요!</h2>
                    <div>
                        <div>
                            <img src="https://imgur.com/FrGUI1s.png" alt="이미지" />
                            <h4>더 좋은 컨텐츠를<br/>만들 수 있습니다.</h4>
                            나와 맞는 크리에이터를 만나보세요!<br/>
                            함께하면 채널이 더욱 성장할 수 있습니다.<br/><br/>
                            <p className='shaking'><a href="#">&nbsp;[ 크리에이터 만나기 ]&nbsp;</a><br/></p>
                        </div>
                    
                        <div>
                            <img src="https://imgur.com/AwryQwj.png" alt="이미지" />
                            <h4>혼자서는<br/>한계가 있을 수 있습니다.</h4>
                            경험이나 정보 공유는 물론<br/>
                            필요한 장비나 인력도 모집할 수 있습니다.<br/><br/>
                            <p className='shaking'><a href="#">&nbsp;[ 커뮤니티 가기 ]&nbsp;</a></p><br/>
                        </div>
                        
                        <div>
                            <img src="https://imgur.com/UsE4qjV.png" alt="이미지" />
                            <h4>혹시 굿즈를<br/>판매하시나요?</h4>
                            사이트에 자신의 굿즈를 등록할 수 있습니다!<br/><br/>
                            <p className='shaking'>
                                <a href="#">&nbsp;[ SHOP 가기 ]&nbsp;</a><br/>
                                <a href="#">&nbsp;[ 제휴 문의 ]&nbsp;</a>
                            </p>
                        </div>
                    </div>       
                </section>
           </article>
           
           <article className="main_sec3">
              <section>
                  <h3>Partnership with MCN</h3>
                  <h2>MCN과의 협업을 통해 다양한 이벤트와 정보를 제공합니다.</h2>
                  
                  <div>
                     <div>
                      <img src="https://i.namu.wiki/i/d5UfOWNIgTCg2Xuigf5i_QKmwp4XE2-GXCypiXpQZF1Y1JADHYa4Q6WDTz0k7xs4a04nfuQFT9YbpwMwvoOku0nOOUJNMg1X1xlty8IxPgbJGShcdAZPH4nMjjqQI-S6bafCL9u0iCGMHZ6qe2kJCw.svg" alt="이미지" />
                      <img src="https://post-phinf.pstatic.net/MjAxOTAyMDFfMTg4/MDAxNTQ5MDAwODY1Mzc5.Eu0nDimdmN3QnoTWMUIwGP5H_etf5LwIHJrP6GrT2F8g.wK7gwvTCEGGiF1dfdK68oISi5AhnCePFBmUNNZ6ug84g.PNG/image_5538809441549000698253.png?type=w800_q75" alt="이미지" />
                      <img src="https://i.namu.wiki/i/r0Ycu_cQ-6qj1O6S8TJ7-LG1twUdiajEspBwhWdMjuBCmk86Up7pDvfdHl4JFKSKDALaC1yTtNyR1rZn-DQWHQ28_ecvOWbonkLt4SU-1a1pyWsrJW2ZaRHavYp0viQTbdVsvGd10_DBpoBng7EScQ.svg" alt="이미지" />
                      <img src="https://i.namu.wiki/i/OvKDcpp5SNOdT1a1sdYl-_69NX_3S75PGreBk1KgY96gxikdX7QjVTmkrY5n2x7bO-eH03VNeV2cpJrZXDPqr0BdzwLiJMOOmCgQsDasg-hpGtO4C7s7EztcU9Tfpau7cXkdTL9Dxyb7EYHorS4CUA.svg" alt="이미지" />
                     </div>  
                      
                     <div>
                      <img src="https://i.namu.wiki/i/UGmzCT9ik6zS2UJC4b7gHSvv9N4nkdsV5aehVsK0trupmCsywfDC_hg8xIVTSw-l65kJ6McODQTYbLTKMgyl22xz1MfNpmzcnvD4S-fEuOgikWik8adXHQgJewxBuhLcIhyD0t7CILnky7n3k8E6nw.svg" alt="이미지" />
                      <img src="https://i.namu.wiki/i/ML1qiAgJcbIABEGinqmDpfuaMjaL8lEeqMGT38fcOA3i_hCNqiO2o1gQFQ62HANkTZuRyDgJdQBjQR6o0Yd5v74lYU1P3a8MrBJkWxMKs4VWjvVtdWLQMxePWEgM_ixwLiFYzrJxtmPu6gTD9UzDkQ.webp" alt="이미지" />
                      <img src="https://i.namu.wiki/i/H4iUGGXs9bK9qrKvzJiX59xdkEBbRgSQUaTiHNGaW80VztRfh4pC-C5p1Fvyv_SfldyBMlTDSbtH-tQZ_ek9sXcljybmjhjmALqmL-Vlr3dQsXQJIAdVz-vifbFd0ZZiq3oXk26CanFU3byT5nWWgw.svg" alt="이미지" />
                      <img src="https://i.namu.wiki/i/H1_hXOkEtZ0jEY9euIweM1RPal80_79zLnY_gNruBViekEyGRwPDx-hLvX5xXtlQ-r1HuhLCpbumR21Euit1t2xwLZjDwn1ukRhwImEh3BKUE80DlSal2u1Y4ytb7xsbXb7W1S74lTznOiW_OuKnwQ.svg" alt="이미지" />
                     </div>
                  </div>
                  
                  <p className='shaking'><a href="#">&nbsp;[ 이벤트 보러가기 ]&nbsp;</a></p><br/>
                     
              </section>       
           </article>
           
           <article className="main_sec4">
              <section>
                  <h3>혹시! 당신이 초보 크리에이터라면?</h3>
                  <h2>베테랑 크리에이터들의 꿀팁 대방출</h2>
                  
                  <div>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2017/09/06/17/11/radio-2722271_1280.jpg" alt="이미지" />
                            
                            <div><h5>두더지팩토리</h5>
                                <h4>초보 스트리머에게 추천하는<br />방송장비 Part.4 - 가성비 편</h4>
                                초기자본이 비교적 적은 입문자나 학생 크리에이터에게 추천하는 가성비 갑 브랜드 TOP 10!
                            </div>
                        </div>
                    
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2021/09/13/15/59/youtube-6621791_1280.jpg" alt="이미지" />
                            
                            <div><h5>비스페셋</h5>
                                <h4>21세기 로또 그 자체!<br />유튜브 알고리즘의 모든 것</h4>
                                알고리즘의 간택을 받고싶은 하꼬들에게 빛을! 채널 상승 트랜드와 경향을 분석하고, 내 채널에 맞는 공략법을 찾아보자!
                            </div>
                        </div>

                        <div>
                            <img src="https://cdn.pixabay.com/photo/2021/09/02/02/50/old-man-6592565_1280.jpg" alt="이미지" />

                            <div><h5>호랭이신사</h5>
                                <h4>유튜브 만학도,<br />제 2의 전성기를 맞다</h4>
                                정년퇴직 후 취미로 시작한 유튜브가 100만 구독자를 달성하기까지! 그야말로 제2전성기를 맞은 호랭이신사 인터뷰
                            </div>
                        </div>
                  </div>
                  
                  <p className='shaking'><a href="#">&nbsp;[ 전체보기 ]&nbsp;</a></p><br/>

              </section>       
           </article>
           
           <article className="main_sec5">
              <section>
                  <h3>HACCOMO와 함께 당신의 꿈을 키워보세요!</h3>
                  
                  <button onClick={goRegister}>회원가입</button>
              </section>       
           </article>
        </main>
    );
};

export default Main;