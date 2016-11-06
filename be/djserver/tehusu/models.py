from pymongo import MongoClient


def as_string(event_name):
    return {
        '$cond': [
            {'$lte': [{event_name: '$_id'}, 9]},
            {'$concat': ['0', {'$substr': [{event_name: '$_id'}, 0, -1]}]},
            {'$substr': [{event_name: '$_id'}, 0, -1]}
        ]
    }


def get_measures(granularity='hour'):
    client = MongoClient()
    db = client['test']
    granularities = {
        'minute': {
            '$concat': [
                '$year', '-',
                '$month', '-', '$day', ' ', '$hour', ':', '$minute'
            ]
        },
        'hour': {
            '$concat': ['$year', '-', '$month', '-', '$day', ' ', '$hour']
        },
        'day': {'$concat': ['$year', '-', '$month', '-', '$day']},
        'month': {'$concat': ['$year', '-', '$month']},
        'year': {'$concat': ['$year']},
    }
    return db.iot.aggregate([
        {
            '$project': {
                'temperature': '$temperature',
                'humidity': '$humidity',
                'day': as_string('$dayOfMonth'),
                'month': as_string('$month'),
                'year': as_string('$year'),
                'hour': as_string('$hour'),
                'minute': as_string('$minute'),
            }
        },
        {
            '$group': {
                '_id': granularities[granularity],
                'temperature': {'$avg': '$temperature'},
                'humidity': {'$avg': '$humidity'}
            }
        },
        {'$sort': {"_id": 1}}
    ])
