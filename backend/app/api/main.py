from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
from datetime import datetime


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return {'message': 'Hello World!'}


@app.get('/data/{symbol}')
def get_data(symbol):
    df = pd.read_csv(f'../data-modeling/data/instruments/{symbol}.csv', parse_dates=['DATE'], index_col=0).iloc[:,1:]
    df = df.loc[:, ['DATE', 'OPENP*', 'HIGH', 'LOW', 'CLOSEP*', 'VOLUME']]
    df['DATE'] = df['DATE'].apply(datetime.timestamp).apply(lambda x: x*1000)
    df = df[::-1]
    res = {
        'instrument': symbol,
        'ohlcv': df.values.tolist()
        
    }
    return res
@app.get('/instruments')
def get_instruments():
    df = pd.read_csv('../data-modeling/data/instruments.csv')
    return {'data': df.values.flatten().tolist()}



