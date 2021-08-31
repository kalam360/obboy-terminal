import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
load_dotenv()

PASS = os.getenv('POSTGRES_password')
USER = os.getenv('POSTGRES_user')
HOST = os.getenv('POSTGRES_host')
PORT = os.getenv('POSTGRES_port')


engine = create_engine(f'postgresql://{USER}:{PASS}@{HOST}:{PORT}/dse')


def get_data(symbol, start=None,end=None):
    """
    Get data from the data api.
    symbol : Asset you want to pick, you can get the symbols with "get_symbols" function.
    
    Start: start date of the data. '%Y-%M-%D' format. if start is not provided all data is pulled.
    
    End: Last date of the data. '%Y-%M-%D' format. if no values provided, latest date is considered.
    
    
    """
    if end is None and start is not None:
        end = 'CURRENT_DATE'
        query = f'''select name,tick_date,open,high,low,close,volume from asset 
        left join tick on asset.id = tick.asset_id where asset.name = '{symbol}' and tick.tick_date between '{start}' and {end} '''
    if start is None and end is None:
        query = f'''select name,tick_date,open,high,low,close,volume from asset 
        left join tick on asset.id = tick.asset_id where asset.name = '{symbol}'  '''
    
    if start is not None and end is not None:
        query = f'''select name,tick_date,open,high,low,close,volume from asset 
        left join tick on asset.id = tick.asset_id where asset.name = '{symbol}' and tick.tick_date between '{start}' and '{end}' '''
    try:
        df = pd.read_sql(query, engine).set_index('tick_date', drop=True)
    except:
        raise Exception('Error loading data')
    df.index = pd.to_datetime(df.index)
    df = df.drop('name', axis='columns')
    return df

def get_data_column(symbols,start=None, end=None, column='close'):
    if isinstance(symbols, str):
        df = get_data(symbols, start, end)[column]
        df.name = symbols
        return df
    if len(symbols) == 1:
        df = get_data(symbols[0], start, end)[column]
        df.name = symbols[0]
        return df
    df = pd.DataFrame()
    for each in symbols:
        df[each] = get_data(each, start, end)[column]
    return df


def get_symbols(pat=None):
    query = f'''select name from asset'''
    df = pd.read_sql(query,con=engine).rename({'name':'symbols'}, axis=1)['symbols']
    df = df.astype('string')
    if pat == None:
        return df
    df = df[df.str.contains(pat, case=False)]
    return df



         