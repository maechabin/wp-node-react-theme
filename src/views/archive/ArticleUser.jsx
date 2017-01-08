import React from 'react';

const ArticleUser = (props) => {
  const getUser = userList => id => userList.map(
    (user, i) => (user.id === id ? i : null),
  );
  const userId = getUser(props.user)(props.article.author);
  const user = (props.nameOnly) ? <p>{props.user[userId].slug}</p> : (
    <section>
      <h3>この記事を書いた人</h3>
      <img src={props.user[userId].avatar_urls['96']} alt={props.user[userId].slug} />
      <p>{props.user[userId].slug}</p>
      <p>{props.user[userId].description}</p>
    </section>
  );
  return (
    <div>
      {user}
    </div>
  );
};
ArticleUser.propTypes = {
  article: React.PropTypes.shape({
    author: React.PropTypes.number,
  }),
  nameOnly: React.PropTypes.bool,
  user: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ArticleUser;
