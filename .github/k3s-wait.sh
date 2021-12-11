sleep 10
flag=0
while [ flag == 0 ]; do
    tmp=$(kubectl -n rabbits get pods 2>/dev/null |grep '0/1')
    tmp2=$(kubectl get pods 2>/dev/null |grep '0/1')

    if [ ! -z "$tmp" ] && [ ! -z "$tmp2" ]; do 
        flag = 1
    fi 

    sleep 10
done
