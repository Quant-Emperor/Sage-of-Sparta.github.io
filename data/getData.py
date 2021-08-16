
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
			"ISM/MAN_IMPORTS"]


def get_ism_data(api_url):

	left_df = quandl.get("ISM/MAN_PMI")
	left_df = left_df.rename(columns={'PMI':'MAN_PMI'})
	df = left_df
	for api in api_url:
		right_df = quandl.get(api,column_index=5)
		name = api.split('/')
		right_df = right_df.rename(columns={'Index':name[1]})
		df = df.merge(right_df, on='Date', how='left')
	return(df)


# UNCOMMENT TO GET ISM DATA
#df = get_ism_data(api_url)
#df.to_csv("ism.csv")