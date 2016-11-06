db.iot.aggregate([
    {
        '$project': {
            'temperature': '$temperature',
            'humidity': '$humidity',
            'day': {
                '$cond': [
                    {'$lte': [{'$dayOfMonth': '$_id'}, 9]},
                    {'$concat': ['0', {'$substr': [{'$dayOfMonth': '$_id'}, 0, -1]}]},
                    {'$substr': [{'$dayOfMonth': '$_id'}, 0, -1]}
                ]
            },
            'month': {
                '$cond': [
                    {'$lte': [{'$month': '$_id'}, 9]},
                    {'$concat': ['0', {'$substr': [{'$month': '$_id'}, 0, -1]}]},
                    {'$substr': [{'$month': '$_id'}, 0, -1]}
                ]
            },
            'year': {
                '$cond': [
                    {'$lte': [{'$year': '$_id'}, 9]},
                    {'$concat': ['0', {'$substr': [{'$year': '$_id'}, 0, -1]}]},
                    {'$substr': [{'$year': '$_id'}, 0, -1]}
                ]
            },
            'hour': {
                '$cond': [
                    {'$lte': [{'$hour': '$_id'}, 9]},
                    {'$concat': ['0', {'$substr': [{'$hour': '$_id'}, 0, -1]}]},
                    {'$substr': [{'$hour': '$_id'}, 0, -1]}
                ]
            },
            'minute': {
                '$cond': [
                    {'$lte': [{'$minute': '$_id'}, 9]},
                    {'$concat': ['0', {'$substr': [{'$minute': '$_id'}, 0, -1]}]},
                    {'$substr': [{'$minute': '$_id'}, 0, -1]}
                ]
            }
        }
    },
    {
        '$group': {
            '_id': { '$concat': ['$year', '-', '$month', '-', '$day', ' ', '$hour'] },
            'temperature': {'$avg': '$temperature'},
            'humidity': {'$avg': '$humidity'}
        }
    },
    {'$sort':{"_id":1}}
])