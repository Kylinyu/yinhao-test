import './InputNumber.scss';
import { isNumber } from '../util';

interface Props {
  onChange: (value: string) => void;
  value: string;
}

function InputNumber(props: Props){
  const { onChange, value } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    if (isNumber(value)) {
      onChange(value)  
    }
  }
  return (
    <input className='input' type="text" onChange={handleChange} value={value} />
  )
}

export default InputNumber