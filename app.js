const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
        schema: buildSchema(`
           type RootQuery {
              events: [String!]!
           }

           type RootMutation {
              createEvent(name: String): String
           }


            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return ['Romantic Cooking', 'Saling', 'All-Night Coding'];
            },
            createEvent: (args) => {
              const eventName = args.name;
              return eventName;
            }
        },
        graphiql: true
    })
);

app.listen(3000);


//https://www.youtube.com/watch?v=6YlXANbXt0g&list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_&index=4