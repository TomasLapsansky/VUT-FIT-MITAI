import numpy as np
from keras.models import Sequential
from keras.layers import Dense

X = np.arange(0.0, 10.0, 0.05)  # x array
Y = np.empty(shape=0, dtype=float)  # y array

for x in X:
    Y = np.append(Y, float(x+3))  # y = x + 3

# model architecture
model = Sequential()
model.add(Dense(1, input_shape=(1,)))
model.add(Dense(5, activation='relu'))
model.add(Dense(1, activation='linear'))

# compile model
model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['accuracy'])

# train model
model.fit(X, Y, epochs=256, batch_size=10)

predict = np.arange(20.0, 30.0, 1, float)
print(predict)
print(model.predict(predict)) # predict y values