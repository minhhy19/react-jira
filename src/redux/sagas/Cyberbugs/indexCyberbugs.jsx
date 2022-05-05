import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'

export default function IndexCyberbugs(props) {
  // console.log(props.match.params.projectId);
  let { projectDetail } = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch();
  // console.log('projectDetail', projectDetail);

  useEffect(() => {
    // Khi ng dùng link qua trang này bằng thẻ navlink hoặc ng dùng tự gọ url thì ta sẽ lấy tham số từ url => gọi saga
    const { projectId } = props.match.params;
    dispatch({
      type: 'GET_PROJECT_DETAIL',
      projectId
    })
  }, [])
  
  return (
    <div>
        <div className='main'>
            <HeaderMain projectDetail={projectDetail} />
            
            <InfoMain projectDetail={projectDetail} />

            <ContentMain projectDetail={projectDetail} />
        </div>
    </div>
  )
}
