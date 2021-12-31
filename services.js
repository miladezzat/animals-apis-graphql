const { getRequest } = require("./helpers");
const baseUrl = "https://api.thedogapi.com/v1/images/search";

module.exports = {

    async getDogs({ page, limit }) {
        const dogs = await getRequest({
            url: `${baseUrl}?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`
        });

        return dogs.map((dog) => ({ ...dog, type: 'DOG' }));
    },

    async getCats({ page, limit }) {
        const dogs = await getRequest({
            url: `${baseUrl}?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=${page}&limit=${limit}`
        });

        return dogs.map((dog) => ({ ...dog, type: 'CAT' }));
    }
};