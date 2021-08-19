
import quandl
import csv
import pandas as pd

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

def get_umsci_data():
        df = quandl.get("UMICH/SOC1")
        df = df.rename(columns={'Index':'UMCSI'})
        tmp = quandl.get("UMICH/SOC5")
        print(tmp.columns)

        tmp = tmp[['Current Index','Expected Index']]

        df = df.merge(tmp, on='Date', how='left')
        df.to_csv("umcsi.csv")

def get_gdp_data():
        ### CHECK LATEST YEARS HAVE DATA. Last time run JAPAN had no 2020 GDP
        usa_gdp = quandl.get_table('WB/DATA',series_id='NY.GDP.MKTP.CD',country_code='USA', qopts={'columns': ['year', 'value']})
        usa_gdp_yoy = quandl.get_table('WB/DATA',series_id='NY.GDP.MKTP.KD.ZG',country_code='USA', qopts={'columns': ['year', 'value']})
        usa_gdp_yoy = usa_gdp_yoy.rename(columns={'value':'USA_gdp_growth'})
        usa_gdp = usa_gdp.rename(columns={'value':'USA_gdp'})
        df = usa_gdp
        df = df.merge(usa_gdp_yoy, on='year', how='left')

        for country in ['EUU','CHN','EMU','JPN','DEU','IND','SAU','AUS','KOR','BRA','ITA','MEX','RUS','HKG','SGP']:
                gdp = quandl.get_table('WB/DATA',series_id='NY.GDP.MKTP.CD',country_code=country, qopts={'columns': ['year', 'value']})
                gdp_yoy = quandl.get_table('WB/DATA',series_id='NY.GDP.MKTP.KD.ZG',country_code=country, qopts={'columns': ['year', 'value']})

                gdp = gdp.rename(columns={'value':country+'_gdp'})
                gdp_yoy = gdp_yoy.rename(columns={'value':country+'_gdp_growth'})
                
                df = df.merge(gdp, on='year', how='left')
                df = df.merge(gdp_yoy, on='year', how='left')

        df.to_csv("gdp.csv")

def get_building_permits_starts_comp():
        tmp = quandl.get("FRED/PERMIT")
        tmp = tmp.rename(columns={'Value':'building_permits'})

        print(tmp.head())
        df = tmp
        tmp = quandl.get("FRED/HOUST")
        tmp = tmp.rename(columns={'Value':'housing_starts'})
        print(tmp.head())
        df = df.merge(tmp, on='Date', how='left')

        tmp = quandl.get("FRED/COMPUTSA")
        tmp = tmp.rename(columns={'Value':'completions'})
        df = df.merge(tmp, on='Date', how='left')

        df.to_csv("usa_building.csv")


# UNCOMMENT TO GET ISM DATA
#df = get_ism_data(api_url,api_url_2)
# df.to_csv("ism.csv")

# UNCOMMENT TO GET UMCSI DATA
#get_umsci_data()

# get_gdp_data



# Total Building Authorized by Building Permits for USA   FRED/M0255CUSM398NNBR
# Housing starts  FRED/HOUST



#Durable goods:
#FRED/DGORDER














