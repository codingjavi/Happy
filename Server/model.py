import pandas as pd
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
#bc multilabel
from sklearn.multioutput import MultiOutputClassifier
import pickle

df = pd.read_csv('Training-Data.csv')


df_first_33_cols = df.iloc[:, :33]
X = df_first_33_cols.values

df_last_5_cols = df.iloc[:, -5:]
Y = df_last_5_cols.values


X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2)

rf = RandomForestClassifier()
clf = MultiOutputClassifier(rf, n_jobs=-1) #n_jobs=-1 allows parallel computing to speed up

clf.fit(X_train, Y_train)

pickle.dump(clf, open('model.pkl', 'wb'))
model = pickle.load(open('model.pkl', 'rb'))