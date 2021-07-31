module.exports = async (client, button) => {

    if (button.id === '2') {
        button.reply.defer()
        button.clicker.fetch().then(console.log)
    }
    let schema = require('../schemas/reactionrole')
    schema.find({ MessageID: button.message.id }, async (err, data) => {
        if (!data[0]) return;
        if (button.id.toLowerCase() == data[0].ID.toLowerCase()) {
            if (data[0].ClickedBy.includes(button.clicker.member.id)) {
                try {
                    await button.guild.members.cache.get(button.clicker.member.id).roles.remove(data[0].RoleID)

                    let role = await button.guild.roles.cache.get(data[0].RoleID)
                    button.reply.send('Role <@&' + role + '> successfully removed!', true);
                    let posc = data[0].ClickedBy.indexOf(data[0].ClickedBy[button.clicker.member.id]);
                    data[0].ClickedBy.splice(posc, 1);
                    data[0].save()
                } catch (e) {
                    console.log(e)
                    return;
                }
            } else {
                try {
                    await button.guild.members.cache.get(button.clicker.member.id).roles.add(data[0].RoleID)

                    let role = await button.guild.roles.cache.get(data[0].RoleID)
                    button.reply.send('Role <@&' + role + '> successfully added!', true);
                    data[0].ClickedBy.push(button.clicker.member.id);
                    data[0].save()
                } catch (e) {
                    console.log(e)
                    return;
                }
            }
        }
    })
};