

import glob
import os
import pandas as pd   
import json
from urllib.request import urlopen


print("test")
long_basket = ["AAPL","TSLA","XLF"]
short_basket = []


url = "https://financialmodelingprep.com/api/v3/profile/AAPL?apikey=demo"


#https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?timeseries=10&apikey=c01b3c8e189822588988574a0c3957dd

#


apikey = "c01b3c8e189822588988574a0c3957dd"


    



def get_jsonparsed_data(url):
    """
    Receive the content of ``url``, parse it as JSON and return the object.

    Parameters
    ----------
    url : str

    Returns
    -------
    dict
    """
    response = urlopen(url)
    data = response.read().decode("utf-8")
    return json.loads(data)

url = ("https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?timeseries=10&apikey=c01b3c8e189822588988574a0c3957dd")


i = 0

for ticker in long_basket:

	url = "https://financialmodelingprep.com/api/v3/historical-price-full/%s?timeseries=10&apikey=%s" % (ticker,apikey)
	dict_ = get_jsonparsed_data(url)
	df = pd.DataFrame(dict_['historical'])

	col = ticker + "_ret"
	print(col)
	if i == 0:
		new_df = df[["date","changePercent"]]
		new_df = new_df.rename(columns={"changePercent": col})
	else:
		#new_df = pd.concat([new_df, df["changePercent"]])
		#new_df = new_df.rename(columns={"changePercent": col})

		new_df = new_df.merge(df[["date","changePercent"]], on='date', how='left')
		new_df = new_df.rename(columns={"changePercent": col})
	i = i + 1
	#df = df.rename.rename(columns={"changePercent": col"})    





print(new_df)
