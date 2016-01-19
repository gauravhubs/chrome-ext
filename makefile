main: main.cpp
	g++ main.cpp -o main
	./main | tee timestamp
	git add .
	git commit -a -m "Saved on git "
	git push http://github.com/gauravhubs/mtp.git master



	
