from gensim.models.doc2vec import Doc2Vec

def init_model(corpus):
  # max_epochs = 50
  vec_size = 60 #init was 10 (but gave lower similarities)
  alpha = 0.025

  model = Doc2Vec(vector_size=vec_size,
                  alpha=alpha,
                  min_alpha=0.00025,
                  min_count=1,
                  dm=0) # paragraph vector distributed bag-of-words (PV-DBOW)
  model.build_vocab(corpus)
  return model

def train_model(model, corpus):
  # max_epochs =10
  print('Epoch', end = ': ')
  for epoch in range(50): #my init was 10
    print(epoch, end = ' ')
    model.train(corpus,
                total_examples=model.corpus_count,
                epochs=model.epochs)
    # decrease the learning rate
    model.alpha -= 0.0002
    # fix the learning rate, no decay
    model.min_alpha = model.alpha
  return model
