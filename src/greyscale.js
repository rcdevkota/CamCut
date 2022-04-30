
var processor = {
    timerCallback: function() {
        if (this.video.paused || this.video.ended) {
            return;
        }
        if(document.getElementById('grey_check').checked) {
            this.greyFrame();
        } else if(document.getElementById('sepia_check').checked) {
            this.sepiaFrame();
        }
        var self = this;
        setTimeout(function () {
            self.timerCallback();
        }, 16); // roughly 60 frames per second
    },

    doLoad: function() {
        this.video = document.getElementById("sample_video");
        this.c1 = document.getElementById("c1");
        this.ctx1 = this.c1.getContext("2d");
        var self = this;

        this.video.addEventListener("play", function() {
            self.width = self.video.width;
            self.height = self.video.height;
            self.timerCallback();
        }, false);
    },

    greyFrame: function() {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        const l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
            let grey = (frame.data[i * 4] + frame.data[i * 4 + 1] + frame.data[i * 4 + 2]) / 3;

            frame.data[i * 4] = grey;
            frame.data[i * 4 + 1] = grey;
            frame.data[i * 4 + 2] = grey;
        }
        this.ctx1.putImageData(frame, 0, 0);

        return;
    },

    sepiaFrame: function() {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        const l = frame.data.length / 4;
        let lumaRed,lumaGreen, lumaBlue;

        for (let i = 0; i < l; i++) {
            lumaRed = (frame.data[i * 4] * 0.393 + frame.data[i * 4 + 1] * 0.769 + frame.data[i * 4 + 2] * 0.189);
            lumaGreen = (frame.data[i * 4] * 0.349 + frame.data[i * 4 + 1] * 0.686 + frame.data[i * 4 + 2] * 0.168);
            lumaBlue = (frame.data[i * 4] * 0.272 + frame.data[i * 4 + 1] * 0.534 + frame.data[i * 4 + 2] * 0.131);


            frame.data[i * 4] = lumaRed < 255 ? lumaRed : 255;
            frame.data[i * 4 + 1] = lumaGreen < 255 ? lumaGreen : 255;
            frame.data[i * 4 + 2] = lumaBlue < 255 ? lumaBlue : 255;
        }
        this.ctx1.putImageData(frame, 0, 0);

        return;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    processor.doLoad()
});
