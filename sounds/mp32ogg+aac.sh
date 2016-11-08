# make ogg and aac copies of all mp3 files for playing of sounds on all platforms
# see http://ionden.com/a/plugins/ion.sound/en.html
for f in *.mp3
do
    ffmpeg -i $f -y -c:a libvorbis -q:a 10        "${f%mp3}ogg"
    ffmpeg -i $f -y -c:a aac -b:a 128k -strict -2 "${f%mp3}aac"
done

#ffmpeg -i kuai4.mp3 -c:a libvorbis -q:a 10 kuai.ogg
#ffmpeg -i kuai4.mp3 -c:a aac -b:a 128k -strict -2 kuai.aac
