import React from 'react';

const Fact = (props) => {
  let fact = props.fact.fact;
  let likes = props.fact.likes;
  
  return(
    <div>
      ({likes} likes) Fact: {fact}
    </div>
  );
}

export default Fact;