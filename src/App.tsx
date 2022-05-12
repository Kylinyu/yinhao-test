import { useState } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import './App.scss';
import { textEllipsis } from './util';

interface User {
  code: number;
  qq: string;
  name: string;
  qlogo: string;
  lvzuan: {
    code: number;
    subcode: number;
    level: number;
    vip: number;
    score: number;
    place: number;
    payway: number;
    isyear: number;
    vendor: number;
  }
}

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
  const [user, setUser] = useState<User>();
  const [value, setValue] = useState('');
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
          throw new Error('')
        }
        // 更新并显示消息
      }).catch(e => {
        // toast一个错误消息
      }).finally(() => {
        setUser(res);
      })
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    doSearch(value)
  }
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>)=> {
   if (e.keyCode === 13) {
    doSearch(value)
   }
  }
  return (
      <div className="App">
        <h3>QQ号查询</h3>
        <div className="Search-box">
          <span className='title'>QQ</span>
          <input className='input' type="text" onChange={handleChange} onBlur={handleBlur} onKeyUp={handleKeyUp} />
        </div>
        {user && (
          <div className='Search-result'>
            <div className='logo'>
              <img src={get(user, 'qlogo')} alt="" />
            </div>
            <div>
              <div className='name'>{textEllipsis(get(user, 'name'))}</div>
              <div className='qq'>{get(user, 'qq')}</div>
            </div>
          </div>
        )}
      </div>
  );
}

export default App;
