.PHONY: build build-docker
VERSION := $(shell cat VERSION)
DOCKER_IMAGE := docker.io/ljandrew/john-hancock-frontend

build-docker:
	docker build -t $(DOCKER_IMAGE):$(VERSION) -t $(DOCKER_IMAGE):latest .

push-docker:
	docker push $(DOCKER_IMAGE):$(VERSION)
	docker push $(DOCKER_IMAGE):latest

build:
	npm run build

build-push-docker: build build-docker push-docker
