import { useState } from 'react';
import { get, debounce } from 'lodash';
import axios from 'axios';
import './App.scss';
import { textEllipsis } from './util';
import { useLoading } from './hooks';
import { LoadingIcon, InputNumber } from './components';

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

// const mockres = {
//   "code": 1,
//   "qq": "774740085",
//   "name": "ゆ、 音色 Cutey。ゆ、 音色 Cutey。ゆ、 音色 Cutey。",
//   "qlogo": "https://static-web.stalar.sg/as/stalar-static/scm/license-demo.png",
//   "lvzuan": {
//     "code": 0,
//     "subcode": 0,
//     "level": 7,
//     "vip": 1,
//     "score": 52402,
//     "place": 0,
//     "payway": 0,
//     "isyear": 1,
//     "vendor": 18
//   }
// }

let controller: undefined | AbortController

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [isLoading, load] = useLoading()


  const doSearch = debounce((qq: string) => {
    if(qq) {
      const url = '/qq.info'
      if (controller) {
        controller.abort()
      }
      controller = new AbortController();
      load(
        axios.get(url, {
          params: {
            qq
          },
          signal: controller.signal,
        }).then((res: any) => {
          setUser(res)
          setError('')
        }).catch(() => {
          setError('没有查询结果')
          setUser(null)
        })
      )
    }
  }, 200)
  const handleChange = (value: string) => {
    setValue(value)
    doSearch(value)
  }
  return (
      <div className="app">
        <h3>QQ号查询</h3>
        <div className="search-box">
          <div className='title'>QQ</div>
          <InputNumber value={value} onChange={handleChange} />
        </div>
        {isLoading ? 
        <div className="loading-box">
          <LoadingIcon />
        </div>
         : (
          <>
          {error && <span className="error">{error}</span>}
          {user && (
            <div className='search-result'>
              <div className='logo'>
                <img src={get(user, 'qlogo')} alt="" />
              </div>
              <div>
                <div className='name'>{textEllipsis(get(user, 'name'))}</div>
                <div className='qq'>{get(user, 'qq')}</div>
              </div>
            </div>
          )}
          </>
        )}
      </div>
  );
}

export default App;
