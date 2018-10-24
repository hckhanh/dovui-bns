import PropTypes from 'prop-types'
import React, { memo } from 'react'
import ContentLoader from 'react-content-loader'

const QuestionLoader = memo(({ debug }) => (
  <li className="list-group-item">
    <ContentLoader height={56} width={951.5}>
      <rect x="0" y="0" rx="0" ry="0" width="650" height="24" />
      <rect x="0" y="34" rx="0" ry="0" width="250" height="16" />
      {debug && <rect x="764" y="0" rx="0" ry="0" width="187" height="16" />}
    </ContentLoader>
  </li>
))

QuestionLoader.propTypes = {
  debug: PropTypes.bool
}

const QuestionLoaders = ({ numberQuestion, debug }) => {
  const questionLoaders = []
  for (let i = 0; i < numberQuestion; i++) {
    questionLoaders.push(<QuestionLoader key={i} debug={debug} />)
  }

  return <ul className="list-group mt-5">{questionLoaders}</ul>
}

QuestionLoaders.propTypes = {
  numberQuestion: PropTypes.number.isRequired,
  debug: PropTypes.bool
}

export default memo(QuestionLoaders)
