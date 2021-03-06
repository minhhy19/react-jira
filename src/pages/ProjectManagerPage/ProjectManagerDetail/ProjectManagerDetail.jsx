import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from './Layouts/ContentMain/ContentMain'
import HeaderMain from './Layouts/HeaderMain/HeaderMain'
import InfoMain from './Layouts/InfoMain/InfoMain'
import { GET_PROJECT_DETAIL_SAGA } from '../../../redux/constants/Jira/ProjectConstants'

export default function ProjectManagerDetail(props) {
  let { projectDetail } = useSelector(state => state.ProjectReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    // Khi ng dùng link qua trang này bằng thẻ navlink hoặc ng dùng tự gọ url thì ta sẽ lấy tham số từ url => gọi saga
    const { projectId } = props.match.params;
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId
    })
  }, [])

  return (
    <div className='main'>
      <HeaderMain projectDetail={projectDetail} />

      <InfoMain projectDetail={projectDetail} />

      <ContentMain projectDetail={projectDetail} />
    </div>
  )
}
