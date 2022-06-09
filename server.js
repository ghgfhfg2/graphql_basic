import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id:'1',
    text:"1 text"
  },
  {
    id:'2',
    text:"2 text"
  },
  {
    id:'3',
    text:"3 text"
  }
];

let users = [
  {
    id:"1",
    username:"sooya",
  },
]

const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  type Query {
    allUsers: [User!]
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id: ID): Boolean!
  }
`;

const resolvers = {
  Query: {
    allUsers(root,args) {
      return users
    },
    allTweets(root,args) {
      console.log(root);
      return tweets
    },
    tweet(root,args) {
      console.log(args);
      return tweets;
    },
  },
  Mutation: {
    postTweet(_,{text, userId}){
      const newTweet = {
        id:tweets.length+1,
        text,
      }
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, {id}){
      const tweet = tweets.find(el=>el.id === id)
      if(!tweet) return false;
      tweets = tweets.filter(el=>el.id !== id);
      return true;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
