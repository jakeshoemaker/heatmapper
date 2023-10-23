import csv
import pgeocode
import simplejson as json
import numpy as np

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

encoder = json.JSONEncoder(ignore_nan=True)
nomi = pgeocode.Nominatim('us')
read_f = "./data/harborcap.csv"
origins = [ "http://localhost:8080", "http://localhost" ]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/coords", status_code=200)
async def get_coordinates():
    coordinates = []
    with open(read_f, 'r') as csvfile:
        datareader = csv.reader(csvfile)
        for row in datareader:
            if row:
                data = nomi.query_postal_code(row[0])
                data.fillna(0)
                la = data["latitude"]
                lng = data["longitude"]
                if (not np.isnan(la) and not np.isnan(lng)):
                    coordinates.append([la, lng])
    return encoder.encode(coordinates)

