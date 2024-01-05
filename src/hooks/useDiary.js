// 커스텀 훅 useDiary를 만든다. 직접 프로그래밍한 함수가 리액트 훅스
// 라는 것을 나타내기 위해 use앞에 꼭 붙이고, 고유 데이터 구분하는 id
// 인풋값으로 받는다.


// useDiary 함수를 통해 일기 데이터를 불러오는 기능을 구현합니다.
// useContext를 통해 전체 일기 데이터를 불러온 후 데이터 페이지 이동을 처리
// 이제 useNavigate를 통해서 입력 id와 일치하는 일기 데이터가 없으면
// home화면으로 사용자를 리 다이렉트 즉 보내는 기능을 구현

import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from '../App';
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();
    // useEffect를 이용해 id나 data값이 바뀔때마다 일기 데이터에서 id값과
    // 일치하는 일기를 찾아 해당 일기 데이터를 업데이트 한다.
    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary)
        }
        else{
            alert('일기 데이터가 존재하지 않습니다.')
            navigate('/', {replace: true});
        }
    }, [id, data]);
    return diary;
}

export default useDiary;