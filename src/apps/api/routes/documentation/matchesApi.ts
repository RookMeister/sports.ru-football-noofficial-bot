export const GetTopMatchesSchema = {
	description: 'Gets a top matches',
	tags: ['matches'],
	summary: 'Gets top matches by date',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'Date'
			}
		}
	},
	response: {
		200: {
			description: 'Successful response',
			type: 'array',
			properties: {
				items: {
					type: 'string',
				}
			}
		}
	}
};
