import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier


df = pd.read_csv('dataset/vitals.csv')


()

df.dropna(inplace=True)  
df['OUTPUT'] = df['OUTPUT'].apply(lambda x: 0 if x.lower().strip() == 'normal' else 1)

X = df[[' HR (BPM)', ' RESP (BPM)', ' SpO2 (%)', 'TEMP (*C)']]
y = df['OUTPUT']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)


clf1 = RandomForestClassifier(n_estimators=100, random_state=42)
clf2 = GradientBoostingClassifier(n_estimators=100, random_state=42)
clf3 = VotingClassifier(estimators=[('rf', clf1), ('gb', clf2)], voting='hard')


clf3.fit(X_train, y_train)


joblib.dump(clf3, 'voting_classification_model.pkl')

print("Model trained and saved as 'voting_classification_model.pkl'")
