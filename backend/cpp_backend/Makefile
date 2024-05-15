project_configure_fresh:
	rm -fr build
	mkdir build
	cmake -B build -S .

project-build:
	cmake --build build

start-matching-server:
	./build/stock_app

start-rest:
	python3 app/main/rest.py