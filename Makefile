.PHONY: build push deploy

build:
	docker build --platform linux/amd64 -t asia-northeast1-docker.pkg.dev/anaregdesign-455601/anaregdesign-web-service/web:local .

push:
	docker push asia-northeast1-docker.pkg.dev/anaregdesign-455601/anaregdesign-web-service/web:local

pull:
	docker pull asia-northeast1-docker.pkg.dev/anaregdesign-455601/anaregdesign-web-service/web:local

run:
	docker run -p 8080:8080 asia-northeast1-docker.pkg.dev/anaregdesign-455601/anaregdesign-web-service/web:local


deploy:
	gcloud run deploy anaregdesign-web-service \
	--image=asia-northeast1-docker.pkg.dev/anaregdesign-455601/anaregdesign-web-service/web:local \
	--region=asia-northeast1 \
	--platform=managed \
	--allow-unauthenticated