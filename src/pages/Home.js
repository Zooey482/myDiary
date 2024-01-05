// 저희 메인페이지에 이번달 기준 날짜 데이터가 필요합니다.
// state이 초기값으로 날짜 객체를 부르는 방법을 통하여 현재 날짜를 초기값으로 전달
// 월별로 일기 데이터를 구분하려면 date 객체에서 해당 월의 가장
// 빠른 시간과 가장 늦은 시간의 타임 스탬프 값을 구해야 한다.
import {useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import DiaryList from "../component/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth() +1}월`;

    useEffect(() => {
        setPageTitle('내 일기장 메인')
        if (data.length >= 1) {
            const {beginTimeStamp, endTimeStamp} 
            = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => 
                beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        }
        else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);
    
    const onIncreaseMonth = () => {
      setPivotDate(new Date(pivotDate.getFullYear(),
      pivotDate.getMonth() + 1))  
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),
        pivotDate.getMonth() - 1))
    };


    return (
    <div>
        {/* <div>Home 페이지 입니다</div> */}
        <div>
            <Header title={headerTitle} 
                leftChild={
                    <Button 
                    // type='positive'
                    text={'<'}
                    onClick={onDecreaseMonth}/>
                }
                rightChild={
                    <Button 
                    // type='negative'
                    text={'>'}
                    onClick={onIncreaseMonth}/>
                }  
            />
        </div>
        <DiaryList data={filteredData}/>
        
    </div>
    )

};
export default Home;