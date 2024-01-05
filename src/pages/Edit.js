import { useContext,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";
import { setPageTitle } from "../util";

const Edit = () => {
    useEffect(() => {
        setPageTitle('일기 고치는 곳')
    })
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);

    const onSubmit = (data) => {
        if (window.confirm('일기를 진짜 수정할까요?')) {
            const {date, content, emotionId} = data;
            onUpdate(id, date, content, emotionId);
            navigate('/', {replace:true});
        }
    }

    const onClickDelete = () => {
        if (window.confirm('일기를 진짜 삭제할까요? 복구불가')){
            onDelete(id);
            navigate('/', {replace: true});
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    if (!data) {
        return <div>일기 불러오고 있습니다.</div>
    }
    else {
        return (
            <div>
                <Header
                    title={'일기수정하기'}
                    leftChild={<Button text={'뒤로가기'} onClick={goBack}/>}
                    rightChild={<Button text={'삭제하기'} 
                        type={'navigate'}
                        onClick={onClickDelete}
                        />}
                />
                <Editor initData={data} onSubmit={onSubmit}/>
            </div>
        )
    }
    
};
export default Edit;