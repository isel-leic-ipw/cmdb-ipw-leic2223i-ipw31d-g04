const URI_PREFIX = 'http://localhost:9200/'

export default function () {
    return {
        getAll: (index) => `${URI_PREFIX}${index}/_search`,
        get: (index, id) => `${URI_PREFIX}${index}/_doc/${id}`,
        create: (index) => `${URI_PREFIX}${index}/_doc/?refresh=wait_for`,
        update: (index, id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
        delete: (index, id) => `${URI_PREFIX}${index}/_doc/${id}?refresh=wait_for`,
    }
}