
import quandl
import csv

quandl.ApiConfig.api_key = "hQqbsfakqXiqavyb4SV9"
#mydata = quandl.get("FRED/GDP")

api_url = [ "ISM/MAN_NEWORDERS",
			"ISM/MAN_EMPL",
			"ISM/MAN_PROD",
			"ISM/MAN_DELIV",
			"ISM/MAN_INVENT",
			"ISM/MAN_CUSTINV",
			"ISM/MAN_PRICES",
			"ISM/MAN_BACKLOG",
			"ISM/MAN_EXPORTS",
			"ISM/MAN_IMPORTS",
			]


api_url_2 = ["ISM/NONMAN_BUSACT",
			 "ISM/NONMAN_NEWORD",
			 "ISM/NONMAN_EMPL",
			 "ISM/NONMAN_DELIV",
			 "ISM/NONMAN_INVENT",
			 "ISM/NONMAN_INVSENT",
			 "ISM/NONMAN_BACKLOG",
			 "ISM/NONMAN_PRICES",
			 "ISM/NONMAN_IMPORTS",
			 "ISM/NONMAN_EXPORTS"
]


def get_ism_data(api_url,api_url_2):

	left_df = quandl.get("ISM/MAN_PMI")
	left_df = left_df.rename(columns={'PMI':'MAN_PMI'})
	df = left_df
	for api in api_url:
		right_df = quandl.get(api,column_index=5)
		name = api.split('/')
		right_df = right_df.rename(columns={'Index':name[1]})
		df = df.merge(right_df, on='Date', how='left')

	right_df = quandl.get("ISM/NONMAN_NMI")
	right_df = right_df.rename(columns={'Index':'NONMAN_NMI'})
	df = df.merge(right_df, on='Date', how='left')

	for api in api_url_2:
		right_df = quandl.get(api,column_index=4)
		name = api.split('/')
		right_df = right_df.rename(columns={'Diffusion Index':name[1]})
		df = df.merge(right_df, on='Date', how='left')


	return(df)


# UNCOMMENT TO GET ISM DATA
df = get_ism_data(api_url,api_url_2)
df.to_csv("ism.csv")