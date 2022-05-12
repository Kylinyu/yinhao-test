import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { textEllipsis } from './util';

const res = {
  "code": 1,
  "qq": "774740085",
  "name": "ゆ、 音色 Cutey。ゆ、 音色 Cutey。ゆ、 音色 Cutey。",
  "qlogo": "https://static-web.stalar.sg/as/stalar-static/scm/license-demo.png",
  "lvzuan": {
  "code": 0,
  "subcode": 0,
  "level": 7,
  "vip": 1,
  "score": 52402,
  "place": 0,
  "payway": 0,
  "isyear": 1,
  "vendor": 18
  }
}

function App() {
  const [userInfo, setUserInfo] = useState(res);
  const doSearch = (qq: string) => {
    if(qq) {
      const url = 'https://api.uomg.com/api/qq.infol'
      axios.get(url, {
        params: {
          qq
        }
      }).then(res => {
        // 捕获接口异常
        if (res?.data?.code !== 200) {
          console.log('res:::', res);
          throw new Error('')
        }
        // 更新并显示消息
      }).catch(e => {
        // toast一个错误消息
      }).finally(() => {
        setUserInfo(res);
      })
    }
  }
  return (
      <div className="App">
        <h3>QQ号查询</h3>
        <div className='Search-box'>
          <span className='title'>QQ</span>
          <input className='input' type="text" onBlur={(e) => { doSearch(e.target.value) }} onKeyUp={(e)=>{if (e.keyCode === 13) { doSearch(e.target.value) }}} />
        </div>
        {userInfo && (
          <div className='Search-result'>
            <div className='logo'>
              <img src={userInfo?.qlogo} alt="" />
            </div>
            <div>
              <div className='name'>{textEllipsis(userInfo?.name)}</div>
              <div className='qq'>{userInfo?.qq}</div>
            </div>
          </div>
        )}
      </div>
  );
}

export default App;
