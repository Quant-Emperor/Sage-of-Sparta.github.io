

import glob
import os
import pandas as pd   
df = pd.concat(map(pd.read_csv, glob.glob(os.path.join('', "D:/Trading/Data/zacks stock screener/input/*.csv"))))

print(len(df))
print(df.columns)
# Order 
# Company Name
# Ticker
# Exchange
# Sector
# Industry
# Market Cap

# Month of Fiscal Year End - When they report fiscal year end
# P/E (Trailing)
# P/E (F1)
# P/E (F2)
# F0 Consensus - EPS for last fiscal year
# F1 Consensus - Estimated EPS for current fiscal year
# F2 Consensus - Estimate for next fiscal year
# PEG Ratio

#or df['F1 Consensus Est.'] == ''  or df['F1 Consensus Est.'] == ''  or  df['F1 Consensus Est.'] == ''  or df['P/E (F1)'] == ''  or df['P/E (F2)'] == ''
# We need forward PE ratios and EPS Consensus estimates. Create missing record of missing data
clean_df = df.dropna(subset=['F0 Consensus Est.','F1 Consensus Est.','F2 Consensus Est.','P/E (F1)','P/E (F2)'],how='any')
print(len(clean_df))

print(clean_df.columns)

missing_df = df[~df.Ticker.isin(clean_df.Ticker)]
print(len(missing_df))

final_df = clean_df.copy()

# Calculate EPS growth figures. EPS Growth F1 and EPS Growth F2
final_df['EPS Growth F1'] = (final_df['F1 Consensus Est.'] - final_df['F0 Consensus Est.'])/final_df['F0 Consensus Est.']
final_df['EPS Growth F2'] = (final_df['F2 Consensus Est.'] - final_df['F1 Consensus Est.'])/final_df['F1 Consensus Est.']

final_df['F1 PEG'] = final_df['P/E (F1)']/(final_df['EPS Growth F1']*100)
final_df['F2 PEG'] = final_df['P/E (F2)']/(final_df['EPS Growth F2']*100)

print(len(final_df))
print(final_df.head())

#Index(['Company Name', 'Ticker', 'Market Cap (mil)', 'Sector', 'Industry',
#       'Month of Fiscal Yr End', 'Exchange', 'F0 Consensus Est.',
#       'F1 Consensus Est.', 'F2 Consensus Est.', 'P/E (Trailing 12 Months)',
#       'P/E (F1)', 'P/E (F2)', 'PEG Ratio'],
#      dtype='object')


# Find companies with highest growth figures in each sector
# EPS Growth figures - Above average filter
# Filter forward PE ratios above average in each sector
# Filter forward peg ratios greater then 1
# Discretion to play to sort the companies by EPS Growth and check whether F1 or F2 is closer to month of fiscal year

output_1 = final_df[['Company Name','Ticker','Exchange','Sector','Industry','Market Cap (mil)','Month of Fiscal Yr End','P/E (Trailing 12 Months)','P/E (F1)','P/E (F2)','F0 Consensus Est.','F1 Consensus Est.', 'F2 Consensus Est.','EPS Growth F1','EPS Growth F2','F1 PEG','F2 PEG','PEG Ratio']]
output_2 = missing_df[['Company Name','Ticker','Exchange','Sector','Industry','Market Cap (mil)','Month of Fiscal Yr End','P/E (Trailing 12 Months)','P/E (F1)','P/E (F2)','F0 Consensus Est.','F1 Consensus Est.', 'F2 Consensus Est.','PEG Ratio']]

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Auto-Tires-Trucks')]
#tmpdf.to_csv('./usa_stocks/us_sector_auto.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Computer and Technology')]
#tmpdf.to_csv('./usa_stocks/us_sector_technology.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Finance')]
#tmpdf.to_csv('./usa_stocks/us_sector_finance.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Consumer Discretionary')]
#tmpdf.to_csv('./usa_stocks/us_sector_consumer_disc.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Consumer Staples')]
#tmpdf.to_csv('./usa_stocks/us_sector_consumer_stap.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Medical')]
#tmpdf.to_csv('./usa_stocks/us_sector_medical.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Industrial Products')]
#tmpdf.to_csv('./usa_stocks/us_sector_industrial.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Basic Materials')]
#tmpdf.to_csv('./usa_stocks/us_sector_materials.csv',index=False,header=False)

#tmpdf = output_1[(output_1['Exchange']!='OTC') & (output_1['Sector']=='Transportation')]
#tmpdf.to_csv('./usa_stocks/us_sector_transportation.csv',index=False,header=False)

tmpdf = output_1[(output_1['Exchange']!='OTC')]
tmpdf.to_csv('./usa_stocks/us_sector_equities.csv',index=False,header=False)




output_1[output_1['Exchange']=='OTC'].to_csv('./usa_stocks/otc_stocks.csv')
output_2.to_csv('./usa_stocks/us_sector_stocks_missing_eps.csv')

























