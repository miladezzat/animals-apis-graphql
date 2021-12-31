const { ApolloServer, gql } = require('apollo-server');
const { getDogs, getCats } = require('./services');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");



const typeDefs = gql`
    enum PetType {
        DOG
        CAT
    }

    type WeightHeight {
        imperial: String
        metric: String
    }

    type breed {
        id: ID!
        weight: WeightHeight
        height: WeightHeight
        name: String
        bred_for: String
        breed_group: String
        life_span: String
        temperament: String
        reference_image_id: String
    }

    type Pet {
        id: ID!
        url: String!
        width: Int
        height: Int
        breeds: [breed]!
        type: String!
    }

    input PetInput {
        type: PetType
        limit: Int
        page: Int        
    }

    type Query {
        pets(input: PetInput): [Pet!]!
    }
`;

const resolvers = {
    Query: {
        async pets(_, { input = {} }) {
            const { type, page = 0, limit = 10 } = input;
            if (type === "DOG") {
                return getDogs({ page, limit });
            } else if (type === "Cat") {
                return getCats({ page, limit });
            }

            const [cats, dogs] = await Promise.all([getDogs({ page, limit }), getCats({ page, limit })]);

            return cats.concat(dogs);
        }
    }
}


const server = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({ env: 'development' }),
    ],
});


const port = process.env.PORT || 3000;

server.listen(port)
    .then(({ url }) => {
        console.log(`🚀 Server is ready on ${url}`);
    })