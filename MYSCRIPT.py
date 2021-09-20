

import pandas as pd
import yfinance as yf
import datetime
import time
import requests
import io


# Input Start and End Date
start = datetime.datetime(2020,2,1)
end = datetime.datetime(2020,10,11)

url="https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_csv/data/7665719fb51081ba0bd834fde71ce822/nasdaq-listed_csv.csv"
s=requests.get(url).content
companies=pd.read_csv(io.StringIO(s.decode('utf-8')))


companies.to_csv("downloaddata.csv")