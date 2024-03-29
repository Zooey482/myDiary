import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import DiaryItem from './DiaryItem';
import Button from './Button';
import './DiaryList.css';

const sortOptionList = [
    {value: 'latest', name: '최신순'},
    {value: 'oldest', name: '오래된순'},
];

const DiaryList = ({data}) => {
    const navigate = useNavigate();
    // useState를 호출해서 아까 '최신순', '오래된순'
    // 분류 기준에 따라 state 업데이트가 일어날 수 있게
    // 리액트 훅스 state를 설정. 초기값은 '최신순'
    const [sortType, setSortType] = useState('latest');
    
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a,b) => {
            // 만약 분류기준이 최근이라면
            // Number 메서드로 명시적 형 변환 후 내림차순으로
            // 날짜 객체 기준으로 정렬하고
            // 반대의 경우 오름차순으로 일기 데이터를 정렬
            if(sortType === 'latest') {
                return Number(b.date) - Number(a.date);
            }
            else {
                return Number(a.date) - Number(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(data));
        // 데이터의 형식은 json이므로 정렬한 데이터를 해석해서 나열해야함.
        // 그래서 json데이터 해석 후 위에 정의된 compare함수를 사용해서 
        // 데이터를 정렬하고 그 데이터를 저장
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    // 상태 업데이트를 초기세팅 했다면 이제
    // 상태 업데이트에 대한 이벤트 핸들러 함수를 선언
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const onClickNew = () => {
        navigate ('/new');
    };

    return (<div className='DiaryList'>
        <div className='menu_wrapper'>
            <div className='left_col'>
                <select value={sortType} onChange={onChangeSortType}>
                    {sortOptionList.map((it, idx) => (
                    <option key={idx} value={it.value}>
                        {it.name}
                    </option>
                ))}</select>
            </div>
            <div className='right_col'>
                <Button type={'positive'} text={'⭐ 새일기 쓰기 ⭐'} 
                     onClick={onClickNew}/>
            </div>
        </div>
        <div className='list_wrapper'>
            {sortedData.map((it) => (
                <DiaryItem key = {it.id} {...it} />
            ))}
        </div>
    </div>
    );
}

export default DiaryList;