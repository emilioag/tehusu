def buildChart(data):
    option = {
        'xAxis': {'data': []},
        'yAxis': {},
        'series': []
    }
    idxs = {}

    for i in data:
        option['xAxis']['data'].append(i['_id'])
        for k in i.keys():
            if k != '_id':
                if k not in idxs:
                    idxs[k] = len(option['series'])
                    option['series'].append({'data': []})
                option['series'][idxs[k]]['name'] = k
                option['series'][idxs[k]]['type'] = 'line'
                option['series'][idxs[k]]['data'].append(i[k])
    return option